"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/modules/auth/actions/auth-actions";
import Link from "next/link";
import { useRef } from "react";
import { toast } from "sonner";
import LoginFormButton from "./buttons/login-form-button";

export default function LoginForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <div className="flex items-center justify-center flex-grow">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <form
          ref={ref}
          action={async (formData: FormData) => {
            const { message } = await login(formData);
            if (message) {
              ref.current?.reset();
              toast("* " + message, {
                description: "",
                action: {
                  label: "Close",
                  onClick: () => {},
                },
              });
            }
          }}
        >
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password."
                  autoComplete="off"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button className="w-full" type="reset" variant="outline">
              Cancel
            </Button>
            <LoginFormButton />
            <Link
              href={"/auth/sign-up"}
              className="flex self-end text-[0.8rem]"
            >
              Don{"'"}t have account? Click here.
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
