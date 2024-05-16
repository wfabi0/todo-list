"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const allowedImages: string[] = [];

const roles: Role[] = ["ADMIN", "USER"];

const accountFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(3, { message: "Email is too short." })
    .max(255, { message: "Email is too long." }),
  password: z
    .string()
    .min(4, { message: "Password is too short." })
    .max(255, { message: "Password is too long." }),
  newPassword: z
    .string()
    .min(4, { message: "Password is too short." })
    .max(255, { message: "Password is too long." })
    .optional(),
});

export type ProfileFormValues = z.infer<typeof accountFormSchema>;

export default function SettingsDesktopAccountForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast("You submitted the following values:", {
      description: JSON.stringify(data, null, 2),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email default aqui" {...field} />
              </FormControl>
              <FormDescription>
                This is the email that will be used for login and notifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your password."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your password must be at least 4 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your new password."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter a new password only if you want to change it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={"sm"}
          className="bg-purple-500 hover:bg-purple-700"
        >
          Update account
        </Button>
      </form>
    </Form>
  );
}
