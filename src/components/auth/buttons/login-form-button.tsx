"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function LoginFormButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-purple-700">
      {pending ? "Wait..." : "Continue"}
    </Button>
  );
}
