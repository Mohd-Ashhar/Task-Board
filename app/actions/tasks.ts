"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { TaskSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type TaskState = {
  error?: {
    title?: string[];
    status?: string[];
    root?: string[];
  };
  message?: string;
};

export async function createTask(prevState: unknown, formData: FormData): Promise<TaskState> {
  const session = await getSession();
  if (!session || !session.userId) {
    return { error: { root: ["Unauthorized"] } };
  }

  const data = {
    title: formData.get("title"),
    status: formData.get("status") || "TODO",
  };

  const parsed = TaskSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.task.create({
      data: {
        title: parsed.data.title,
        status: parsed.data.status,
        userId: session.userId as string,
      },
    });
  } catch (_) {
    return { error: { root: ["Failed to create task"] } };
  }

  revalidatePath("/dashboard");
  return { message: "Task created" };
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
  const session = await getSession();
  if (!session || !session.userId) {
    return { error: "Unauthorized" };
  }

  // Validate status
  const parsed = z.enum(["TODO", "IN_PROGRESS", "DONE"]).safeParse(newStatus);
  if (!parsed.success) {
    return { error: "Invalid status" };
  }

  try {
    // Ensure task belongs to user
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== session.userId) {
      return { error: "Task not found or unauthorized" };
    }

    await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });
    
    revalidatePath("/dashboard");
    return { success: true };
  } catch (_) {
    return { error: "Failed to update task" };
  }
}
