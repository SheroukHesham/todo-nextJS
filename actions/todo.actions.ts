"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { formValues } from "@/schema";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const createTodoAction = async ({
  title,
  body,
  completed,
}: formValues) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
    },
  });

  revalidatePath("/");
};

export const getTodoAction = async () => {
  return await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
};

export const updateTodoAction = async () => {};

export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath("/");
};
