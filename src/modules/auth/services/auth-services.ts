import * as jose from "jose";
import { cookies } from "next/headers";

async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const { payload } = await jose.jwtVerify(token, secret);
  return payload;
}

async function createSessionToken(payload = {}) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime("1d")
    .sign(secret);
  const { exp } = await openSessionToken(session);
  cookies().set("session", session, {
    expires: (exp as number) * 1000,
    path: "/",
    httpOnly: true,
  });
}

async function isSessionValid() {
  const sessionCookie = cookies().get("session");
  if (sessionCookie) {
    const { value } = sessionCookie;
    const { exp } = await openSessionToken(value);
    const currentDate = new Date().getTime();
    return (exp as number) * 1000 > currentDate;
  }
  return false;
}

async function userDetails() {
  const sessionCookie = cookies().get("session");
  if (sessionCookie) {
    const { value } = sessionCookie;
    const { sub, username, email, role, createdAt } = await openSessionToken(
      value
    );
    return {
      id: sub,
      username,
      email,
      role,
      createdAt,
    };
  } else {
    const userCookie = cookies().get("user");
    if (!userCookie) {
      const userId = crypto.randomUUID();
      cookies().set("user", userId, {
        maxAge: 30 * 365 * 24 * 60 * 60 * 1000,
      });
      return { id: userId, username: null };
    }
    return { id: userCookie.value, username: null };
  }
}

function destroySession() {
  cookies().delete("session");
}

function destroyUser() {
  cookies().delete("user");
}

const AuthServices = {
  openSessionToken,
  createSessionToken,
  userDetails,
  isSessionValid,
  destroySession,
  destroyUser,
};

export default AuthServices;
