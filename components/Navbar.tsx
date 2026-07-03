import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between gap-4 px-6 py-4 bg-white shadow-sm dark:bg-slate-900">
      <div className="flex items-center gap-3 text-lg font-semibold">
        <ModeToggle />
        <div>Todo App</div>
      </div>
      <div className="flex items-center gap-2">
        <Show when="signed-out">
          <SignInButton>
            <button className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
              Sign in
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
              Sign up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  );
};

export default Navbar;
