"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // fix hydration issues for ssr
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      variant="outline"
      size="icon"
      className="relative"
    >
      {theme === "dark" ? (
        <SunIcon className="dark:text-white h-[1.2rem] w-[1.2rem] " />
      ) : (
        <MoonIcon className="dark:text-white absolute h-[1.2rem] w-[1.2rem] " />
      )}
    </Button>
  );
}
