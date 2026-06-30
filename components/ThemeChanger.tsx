"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

// No-op subscribe: this "store" never changes after mount,
// so we never need to notify listeners.
const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false, // server snapshot (during SSR / hydration)
  );
}

const ThemeSwitch = () => {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="text-foreground bg-background"
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
};

export default ThemeSwitch;
