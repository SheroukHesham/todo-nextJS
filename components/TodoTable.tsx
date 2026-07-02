"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITodo } from "@/interfaces";
import { Badge } from "./ui/badge";
import TableActions from "./TableActions";

interface IProps {
  todos: ITodo[];
}

export default function TodosTable({ todos }: IProps) {
  return (
    <Table>
      <TableCaption>Recent</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Todo</TableHead>

          <TableHead className="flex justify-center ">Completed</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">
              <div className="flex justify-start">{todo.title}</div>
            </TableCell>

            <TableCell>
              <div className="flex justify-center">
                {todo.completed ? (
                  <Badge>Completed</Badge>
                ) : (
                  <Badge className="cursor-pointer" variant={"secondary"}>
                    Not Completed
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell className="flex justify-end items-center space-x-2">
              <TableActions id={todo.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">{todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
