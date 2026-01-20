import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";

function App() {
  try {
    return (
      <>
        <Box minH="100vh" bg="gray.100" _dark={{ bg: "gray.900" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
          </Routes>
          <Toaster />
        </Box>
      </>
    );
  } catch (error) {
    console.error("App Error:", error);
    return (
      <Box p={4}>
        <h1>Error loading application: {error.message}</h1>
      </Box>
    );
  }
}
export default App;
