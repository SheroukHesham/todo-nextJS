"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export const createTodoAction = async () => {};

export const getTodoAction = async () => {
  return await prisma.todo.findMany();
};

export const updateTodoAction = async () => {};

export const deleteTodoAction = async () => {};
