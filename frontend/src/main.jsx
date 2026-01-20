import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ColorModeProvider } from "./components/ui/color-mode";

try {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <ColorModeProvider>
            <App />
          </ColorModeProvider>
        </BrowserRouter>
      </ChakraProvider>
    </StrictMode>,
  );
} catch (error) {
  console.error("Failed to mount app:", error);
  document.getElementById("root").innerHTML =
    `<h1 style="color: red;">Error: ${error.message}</h1>`;
}
