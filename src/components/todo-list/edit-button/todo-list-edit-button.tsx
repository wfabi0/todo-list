import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useRef, useState } from "react";
import { MoreHorizontal, Package } from "lucide-react";
import { Row } from "@tanstack/react-table";
import TodoListEditCategorySelect, {
  categories,
  Category,
} from "./todo-list-edit-category";
import { Textarea } from "@/components/ui/textarea";
import TodoListEditStatusSelect, {
  Status,
  status,
} from "./todo-list-edit-status-selection";
import { Task } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import FormConfirmButton from "@/components/form-confirm-button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

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
};

export default function TodoListEditButton({ row }: TodoListEditButtonProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof EditFormSchema>>({
    resolver: zodResolver(EditFormSchema),
  });

  async function onSubmit(data: z.infer<typeof EditFormSchema>) {
    const response = await fetch("/api/task/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return toast("Failed to edit task.");
    }

    form.reset();
    toast("Task edited successfully.");
    setOpen(!open);
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} key={"teste"}>
      <DialogTrigger
        onClick={(e) => {
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
        <MoreHorizontal className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Add a task to your to-do list. <br />
            <span className="text-sm">ID: {row.original.id}</span> <br />
            <span className="text-sm">
              Date: {moment(row.original.createdAt).format("lll")}
            </span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            ref={ref}
            className="space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="task-name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Task Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Your task name."
                          defaultValue={row.getValue("name")}
                          className="col-span-3"
                          autoComplete="false"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="task-description"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your task description."
                          defaultValue={row.original.description || ""}
                          className="col-span-3 resize-none"
                          autoComplete="false"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="task-status"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Status</FormLabel>
                    <TodoListEditStatusSelect
                      row={row}
                      form={form}
                      field={field as ControllerRenderProps<any>}
                    />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="task-category"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Category</FormLabel>
                    <TodoListEditCategorySelect
                      row={row}
                      form={form}
                      field={field as ControllerRenderProps<any>}
                    />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="task-id"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="hidden">
                    <Input
                      type="hidden"
                      disabled={true}
                      defaultValue={row.original.id}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                onClick={(e) => {
                  setOpen(!open);
                  form.reset();
                }}
                type="reset"
                variant="outline"
              >
                Cancel
              </Button>
              <FormConfirmButton
                form={form}
                text="Continue"
                className="bg-purple-700 hover:bg-purple-900"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
