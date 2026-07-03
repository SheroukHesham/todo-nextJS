"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

interface IProps {
  id?: string;
  title: string;
  userId: string;
  body?: string;
  completed?: boolean;
}

const prisma = new PrismaClient();

export const createTodoAction = async ({
  title,
  body,
  completed,
  userId,
}: IProps) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
      userId,
    },
  });

  revalidatePath("/");
};

export const getTodoAction = async ({ userId }: { userId: string }) => {
  return await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const updateTodoAction = async ({
  title,
  body,
  completed,
  id,
  userId,
}: IProps) => {
  await prisma.todo.update({
    where: { id, userId },
    data: {
      title,
      body,
      completed,
    },
  });

  revalidatePath("/");
};

export const deleteTodoAction = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  await prisma.todo.delete({
    where: { id, userId },
  });
  revalidatePath("/");
};
