"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type users = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

type taskOptions = "task-todo" | "task-doing" | "task-done";

export default function NavContextSelectText({
  workspace,
}: {
  workspace: any;
}) {
  const [selectedOption, setSelectedOption] =
    useState<taskOptions>("task-todo");
  const totalTasks = workspace.tasks.length;
  return (
    <div className="space-y-3">
      <Select
        defaultValue={"task-todo"}
        value={selectedOption}
        onValueChange={(value: taskOptions) => {
          setSelectedOption(value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="task-todo">
              To do ({workspace.tasks.length})
            </SelectItem>
            <SelectItem value="task-doing">
              Doing ({workspace.tasks.length})
            </SelectItem>
            <SelectItem value="task-done">
              Done ({workspace.tasks.length})
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <AlertDialog>
        <div className="flex justify-center self-center">
          <AlertDialogTrigger>
            <Button className="bg-purple-500">Clear</Button>
          </AlertDialogTrigger>
        </div>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to clear
              <span className="px-1 font-bold text-purple-700">
                {selectedOption === "task-todo"
                  ? "To do"
                  : selectedOption === "task-doing"
                  ? "Doing"
                  : "Done"}
              </span>
              list?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will remove
              <span className="px-1">
                {selectedOption === "task-todo"
                  ? workspace.tasks.length
                  : selectedOption === "task-doing"
                  ? workspace.tasks.length
                  : workspace.tasks.length}
              </span>
              tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-purple-700">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
