"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { ClipboardList, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useRef, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormConfirmButton from "../form-confirm-button";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import TodoListEditButton, {
  EditFormSchema,
} from "./edit-button/todo-list-edit-button";
import TodoListEditCategorySelect from "./edit-button/todo-list-edit-category";
import TodoListEditDeleteButton from "./edit-button/todo-list-edit-delete-button";
import TodoListEditStatusSelect from "./edit-button/todo-list-edit-status-selection";

type TodoListMenuProps = {
  row: Row<Task>;
};

export default function TodoListMenu({ row }: TodoListMenuProps) {
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
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <TodoListEditButton row={row} form={form} />
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>Change status</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {/* mudar para combobox */}
                  <DropdownMenuItem
                    className={`${
                      row.original.status === "TODO" && "bg-gray-200"
                    }`}
                  >
                    <div className="mr-1 h-3 w-3 rounded-full bg-purple-500" />
                    Todo
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`${
                      row.original.status === "DOING" && "bg-gray-200"
                    }`}
                  >
                    <div className="mr-1 h-3 w-3 rounded-full bg-yellow-500" />
                    Doing
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`${
                      row.original.status === "DONE" && "bg-gray-200"
                    }`}
                  >
                    <div className="mr-1 h-3 w-3 rounded-full bg-green-500" />
                    Done
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-500 group"
            >
              <TodoListEditDeleteButton row={row} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
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
