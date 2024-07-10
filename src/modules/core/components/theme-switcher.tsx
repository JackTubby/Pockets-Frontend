import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useTheme } from "../utils/theme-context";

interface ThemeContextType {
  switchTheme: (theme: string) => void;
}

const ThemeSwitcher = () => {
  const { switchTheme } = useTheme() as ThemeContextType;
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  const [icon, setIcon] = useState(mode === "light" ? "pi pi-sun" : "pi pi-moon");

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      switchTheme("lara-dark-teal");
    } else {
      document.body.classList.remove("dark-mode");
      switchTheme("lara-light-teal");
    }
  }, [mode, switchTheme]);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setIcon("pi pi-moon");
      localStorage.setItem("mode", "dark");
    } else {
      setMode("light");
      setIcon("pi pi-sun");
      localStorage.setItem("mode", "light");
    }
  };

  return (
    <div>
      <Button icon={icon} rounded text raised onClick={toggleMode} aria-label="Switch theme"></Button>
    </div>
  );
};

export default ThemeSwitcher;
