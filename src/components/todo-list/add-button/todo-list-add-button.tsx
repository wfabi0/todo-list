"use client";

import { Package, Plus } from "lucide-react";
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
import { Input } from "../../ui/input";
import TodoListCategorySelect from "./todo-list-category-select";
import TodoListStatusSelect from "./todo-list-status-select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { toast } from "sonner";
import FormConfirmButton from "@/components/form-confirm-button";
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

export const FormSchema = z.object({
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

type TodoListAddButtonProps = {
  setUpdate: (value: any) => void;
};

export default function TodoListAddButton({
  setUpdate,
}: TodoListAddButtonProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch(`/api/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return toast("Failed to create task.");
    }

    form.reset();
    toast("Success to create task.");
    setUpdate((prev: boolean) => !prev);
    setOpen(!open);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto bg-purple-700 hover:bg-purple-900"
        >
          <Plus className="ml-2 h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Add a task to your to-do list.</DialogDescription>
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
                          className="col-span-3"
                          autoComplete="off"
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
                          className="col-span-3 resize-none"
                          autoComplete="off"
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
                    <TodoListStatusSelect
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
                    <TodoListCategorySelect
                      form={form}
                      field={field as ControllerRenderProps<any>}
                    />
                  </div>
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
