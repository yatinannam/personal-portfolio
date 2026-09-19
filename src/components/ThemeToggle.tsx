import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={`flex h-8 w-8 items-center justify-center rounded border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors ${className}`}
    >
      {mounted && (isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />)}
    </button>
  );
};

export default ThemeToggle;
