"use client";

import FormConfirmButton from "@/components/form-confirm-button";
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
import SpinUtil from "@/components/utils/spin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SettingsDesktopProfileFormImage from "./settings-desktop-profile-form-image-";

const allowedImages: string[] = [
  "couple01.jpeg",
  "notepad01.jpeg",
  "notepad02.jpeg",
  "notepad03.jpeg",
  "boy01.jpeg",
  "boy02.jpeg",
  "boy03.jpeg",
  "men01.jpeg",
  "men02.jpeg",
  "girl01.jpeg",
  "girl02.jpeg",
  "girl03.jpeg",
  "girl04.jpeg",
  "girl05.jpeg",
];

const roles: Role[] = ["ADMIN", "USER"];

const profileFormSchema = z.object({
  id: z.string({ required_error: "" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30, { message: "Username must not be longer than 30 characters." }),
  avatar: z.object({
    value: z.string().refine((value) => allowedImages.includes(value), {
      message: "Invalid image.",
    }),
  }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function SettingsDesktopProfileForm() {
  const [defaultValues, setDefaultValues] = useState<ProfileFormValues>({
    id: "",
    username: "",
    avatar: { value: "notepad02.jpeg" },
  });

  async function fetchUserInfo(id: string) {
    const response = await fetch("/api/user/" + id);
    return await response.json();
  }

  async function fetchSession() {
    const response = await fetch("api/auth/check");
    return await response.json();
  }

  const sessionQuery = useQuery({
    queryKey: ["session-info"],
    queryFn: fetchSession,
  });

  const userQuery = useQuery({
    queryKey: ["user-info", sessionQuery.data?.userDetails.id],
    queryFn: () => fetchUserInfo(sessionQuery.data?.userDetails.id),
    enabled: !!sessionQuery.data?.userDetails.id,
  });

  const isLoading = sessionQuery.isLoading || userQuery.isLoading;
  const data = useMemo(
    () => ({
      user: userQuery?.data?.data,
      session: sessionQuery?.data,
    }),
    [userQuery?.data?.data, sessionQuery?.data]
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      id: data?.user?.id || "",
      username: data?.user?.username || "",
      avatar: {
        value: data?.user?.avatar || "notepad02.jpeg",
      },
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!isLoading && data) {
      form.reset({
        id: data?.user?.id || "",
        username: data.user?.username || "",
        avatar: {
          value: data.user?.avatar || "notepad02.jpeg",
        },
      });
    }
  }, [isLoading, data, form]);

  async function onSubmit(data: ProfileFormValues) {
    const response = await fetch(`/api/user/${data.id}/edit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 429) {
      return toast.error("You can only update your profile once per minute.");
    }
    if (!response.ok) {
      return toast.error("An error occurred while updating your profile.");
    }
    setDefaultValues(data);
    await sessionQuery.refetch();
    await userQuery.refetch();
    toast.success("Your profile has been updated.");
  }

  return isLoading ? (
    <div className="flex items-center pt-5 justify-center">
      <SpinUtil size="16" />
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Avatar -{" "}
                {form.getValues("avatar")?.value.toString().split(".")[0]}{" "}
                {form.getValues("avatar")?.value.toString() ===
                data?.user?.avatar
                  ? "(current)"
                  : ""}
              </FormLabel>
              <FormControl>
                <SettingsDesktopProfileFormImage
                  form={form}
                  field={field as ControllerRenderProps<any>}
                  isLoading={isLoading}
                  data={data}
                />
              </FormControl>
              <FormMessage />
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
        {/* <FormItem>
          <FormLabel>Roles</FormLabel>
          <FormControl>
            <div className="grid grid-cols-9 gap-2">
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
        </FormItem> */}
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormConfirmButton
          className="bg-purple-500 hover:bg-purple-700"
          text="Update profile"
          form={form}
        />
      </form>
    </Form>
  );
}
