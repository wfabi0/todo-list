"use client";

import { Badge } from "@/components/ui/badge";
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
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import SettingsMobileProfileFormImage from "./settings-mobile-profile-form-image";

const allowedImages: string[] = [];
const roles: Role[] = ["ADMIN", "USER"];

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must not be longer than 30 characters." }),
  image: z
    .object({
      value: z.string().refine((value) => allowedImages.includes(value), {
        message: "Invalid image.",
      }),
    })
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function SettingsMobileProfile() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <SettingsMobileProfileFormImage
                  field={field as ControllerRenderProps<any>}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="nome padrão aqui" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Roles</FormLabel>
          <FormControl>
            <div className="grid grid-cols-4 gap-2">
              {roles.map((role) => (
                <Badge
                  className="text-center items-start justify-center"
                  variant={`${role === "ADMIN" ? "destructive" : "default"}`}
                  key={role}
                >
                  {role}
                </Badge>
              ))}
            </div>
          </FormControl>
        </FormItem>
        <Button type="submit" className="bg-purple-500 hover:bg-purple-700">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
