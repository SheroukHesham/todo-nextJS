import { useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { deleteTodoAction } from "@/actions/todo.actions";
import LoadingSpinner from "./LoadingSpinner";
import { DialogMenu } from "./DialogMenu";
import { ITodo } from "@/interfaces";

const TableActions = ({ todo, userId }: { todo: ITodo; userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <DialogMenu userId={userId} editTodo={todo} />
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={async () => {
          setIsLoading(true);
          await deleteTodoAction({ id: todo.id, userId });
          setIsLoading(false);
        }}
      >
        {isLoading ? <LoadingSpinner /> : <Trash size={16} />}
      </Button>
    </>
  );
};

export default TableActions;
