"use server";

import { formValues } from "@/components/DialogMenu";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export const createTodoAction = async ({ title, body }: formValues) => {
  await prisma.todo.create({
    data: {
      title,
      body,
    },
  });
};

export const getTodoAction = async () => {
  return await prisma.todo.findMany();
};

export const updateTodoAction = async () => {};

export const deleteTodoAction = async () => {};
