import { createContext, useContext, useState, useEffect } from "react";

const ColorModeContext = createContext();

export function ColorModeProvider({ children }) {
  const [colorMode, setColorMode] = useState(
    () => localStorage.getItem("chakra-ui-color-mode") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.style.colorScheme = colorMode;

    root.classList.add(colorMode);
    root.setAttribute("data-theme", colorMode);

    localStorage.setItem("chakra-ui-color-mode", colorMode);
  }, [colorMode]);

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}
