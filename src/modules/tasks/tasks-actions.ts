"use server";

import { FormSchema } from "@/components/todo-list/add-button/todo-list-add-button";
import { EditFormSchema } from "@/components/todo-list/edit-button/todo-list-edit-button";
import { Category, TaskStatus } from "@prisma/client";
import { z } from "zod";
import prisma from "../database/prisma-service";

export async function getTask(id: string) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      return { message: "Task not found.", status: 404 };
    }
    return { task, message: "Task fetched successfully.", status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Failed to fetch task.", status: 500 };
  }
}

export async function createTask(formData: z.infer<typeof FormSchema>) {
  const {
    "task-name": name,
    "task-description": description,
    "task-status": status,
    "task-category": category,
    "task-workspaceId": workspaceId,
  } = formData;

  let statusValue = status.value.toUpperCase() as TaskStatus;
  let categoryValue = category.value.toUpperCase() as Category;

  try {
    const task = await prisma.task.create({
      data: {
        name,
        description,
        status: statusValue,
        category: categoryValue,
        workspaceId,
      },
    });
    return { task, message: "Task created successfully.", status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create task.", status: 500 };
  }
}

export async function getTasks(workspaceId: string) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        workspaceId,
      },
    });
    if (tasks.length === 0) {
      return {
        tasks,
        message: "No tasks found for this workspace.",
        status: 404,
      };
    }
    return { tasks, message: "Tasks fetched successfully.", status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Failed to fetch tasks.", status: 500 };
  }
}

export async function editTask(formData: z.infer<typeof EditFormSchema>) {
  const {
    "task-id": id,
    "task-name": name,
    "task-description": description,
    "task-status": status,
    "task-category": category,
    "task-workspaceId": workspaceId,
  } = formData;

  let statusValue = status.value.toUpperCase() as TaskStatus;
  let categoryValue = category.value.toUpperCase() as Category;

  try {
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        status: statusValue,
        category: categoryValue,
      },
    });
    return { task, message: "Task updated successfully.", status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Failed to update task.", status: 500 };
  }
}

export async function deleteTask(id: string) {
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      return { message: "Task not found.", status: 404 };
    }

    await prisma.task.delete({ where: { id } });
    return { message: "Task deleted successfully.", status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Failed to delete task.", status: 500 };
  }
}
