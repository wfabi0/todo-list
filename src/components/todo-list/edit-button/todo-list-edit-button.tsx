import { DialogTrigger } from "../../ui/dialog";
import { Package, SquarePen } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { categories, Category } from "./todo-list-edit-category";
import { Status, status } from "./todo-list-edit-status-selection";
import { Task } from "@prisma/client";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

export const EditFormSchema = z.object({
  "task-id": z.string({ required_error: "" }),
  "task-name": z
    .string({
      required_error: "",
    })
    .min(3)
    .max(50),
  "task-description": z.string({ required_error: "" }).min(3).max(300),
  "task-status": z
    .object({
      value: z.string({ required_error: "" }),
      label: z.string({ required_error: "" }),
      color: z.string({ required_error: "" }),
    })
    .default({
      value: "todo",
      label: "Todo",
      color: "bg-purple-500",
    }),
  "task-category": z
    .object({
      value: z.string({ required_error: "" }),
      label: z.string({ required_error: "" }),
      icon: z.any({ required_error: "" }),
    })
    .default({
      value: "other",
      label: "Other",
      icon: Package,
    }),
  "task-workspaceId": z.string({ required_error: "" }).default("teste"),
});

type TodoListEditButtonProps = {
  row: Row<Task>;
  form: UseFormReturn<any>;
};

export default function TodoListEditButton({
  row,
  form,
}: TodoListEditButtonProps) {
  return (
    <>
      <DialogTrigger
        className="flex flex-1"
        onClick={() => {
          form.setValue("task-id", row.original.id);
          form.setValue("task-name", row.original.name);
          form.setValue("task-description", row.original.description || "");
          form.setValue(
            "task-status",
            status.find((stats) => stats.value === row.original.status) ||
              (status.find((stats) => stats.value === "TODO") as Status)
          );
          form.setValue(
            "task-category",
            categories.find((cat) => cat.value === row.original.category) ||
              (categories.find((cat) => cat.value === "OTHER") as Category)
          );
        }}
      >
        <SquarePen className="mr-2 h-4 w-4" />
        <span>Edit task</span>
      </DialogTrigger>
    </>
  );
}
