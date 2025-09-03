"use client";

import { useTheme } from "@/context/theme-context";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-md bg-background text-foreground cursor-pointer"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-accent bg-background text-foreground hover:bg-accent cursor-pointer focus:outline-none transition-colors duration-200"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-200 ${
          theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-200 ${
          theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggle;
