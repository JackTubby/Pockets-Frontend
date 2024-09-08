import React, { createContext, useContext, ReactNode, useEffect } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    return savedTheme || "light";
  });

  useEffect(() => {
    const themeLink = document.getElementById("theme-css") as HTMLLinkElement;
    if (themeLink) {
      themeLink.href =
        theme === "light"
          ? "https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css"
          : "https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      const themeLink = document.getElementById("theme-css") as HTMLLinkElement;
      if (themeLink) {
        themeLink.href =
          newTheme === "light"
            ? "https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css"
            : "https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css";
      }
      return newTheme;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
