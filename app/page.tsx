import { getTodoAction } from "@/actions/todo.actions";
import { DialogMenu } from "@/components/DialogMenu";
import TodosTable from "@/components/TodoTable";

export default async function Home() {
  const todos = await getTodoAction();

  return (
    <div className="flex flex-col flex-1  items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <DialogMenu />
      <div className="px-10 w-full mt-10">
        <TodosTable todos={todos} />
      </div>
    </div>
  );
}
