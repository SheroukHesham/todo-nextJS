import { getTodoAction } from "@/actions/todo.actions";
import { DialogMenu } from "@/components/Dialog";

export default async function Home() {
  const todos = await getTodoAction();
  console.log(todos);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <DialogMenu />
    </div>
  );
}
