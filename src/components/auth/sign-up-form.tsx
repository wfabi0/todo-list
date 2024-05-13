"use client";

import { useRef } from "react";
import { toast } from "sonner";
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
import { createAccount } from "@/modules/auth/actions/auth-actions";
import Link from "next/link";
import FormConfirmButton from "../form-confirm-button";

export default function SignUpForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <div className="flex items-center justify-center flex-grow">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your credentials to create your account.
          </CardDescription>
        </CardHeader>
        <form
          ref={ref}
          action={async (formData: FormData) => {
            const { message } = await createAccount(formData);
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
                  id="email"
                  name="email"
                  autoComplete="off"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  placeholder="Your username."
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
            <FormConfirmButton
              text="Continue"
              className="w-full bg-purple-700"
            />
            <Link href={"/auth/login"} className="flex self-end text-[0.8rem]">
              Do you have account? Click here.
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
