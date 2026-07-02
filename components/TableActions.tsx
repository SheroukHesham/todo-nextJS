import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { deleteTodoAction } from "@/actions/todo.actions";
import LoadingSpinner from "./LoadingSpinner";

const TableActions = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button size={"icon"}>
        <Plus size={16} />
      </Button>
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={async () => {
          setIsLoading(true);
          await deleteTodoAction({ id });
          setIsLoading(false);
        }}
      >
        {isLoading ? <LoadingSpinner /> : <Trash size={16} />}
      </Button>
    </>
  );
};

export default TableActions;
