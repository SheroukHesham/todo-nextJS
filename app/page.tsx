import { getTodoAction } from "@/actions/todo.actions";
import { DialogMenu } from "@/components/DialogMenu";
import TodosTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  const todos = await getTodoAction({ userId: userId as string });

  return (
    <div className="mt-5 flex flex-col w-full  justify-center space-y-5 items-center  bg-zinc-50 font-sans dark:bg-black">
      <DialogMenu userId={userId as string} />

      <div className="w-5xl ">
        <TodosTable todos={todos} userId={userId as string} />
      </div>
    </div>
  );
}
