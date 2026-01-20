import { useState } from "react";
import { Box, Button, Input, VStack, HStack, Heading } from "@chakra-ui/react";

export const AdminPasswordModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password.trim()) {
      onConfirm(password);
      setPassword("");
    }
  };

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && password.trim() && !isLoading) {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      onClick={handleClose}
    >
      <Box
        bg="white"
        _dark={{ bg: "gray.800" }}
        borderRadius="lg"
        p={6}
        maxW="400px"
        w="90%"
        onClick={(e) => e.stopPropagation()}
        boxShadow="lg"
      >
        <Heading size="md" mb={4}>
          Admin Password Required
        </Heading>
        <VStack gap={4}>
          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            autoFocus
          />
        </VStack>
        <HStack gap={2} mt={6} justify="flex-end">
          <Button variant="ghost" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            colorPalette="blue"
            onClick={handleSubmit}
            disabled={isLoading || !password.trim()}
            isLoading={isLoading}
          >
            {isLoading ? "Verifying..." : "Confirm"}
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
