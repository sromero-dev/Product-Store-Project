import { Container, Flex, Text, Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPlus, FaMoon, FaSun } from "react-icons/fa";
import { useColorMode } from "./ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          css={{
            background:
              "linear-gradient(to right, var(--chakra-colors-cyan-400), var(--chakra-colors-blue-500))",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>

        <HStack gap={2} alignItems="center">
          <Link to={"/create"}>
            <Button
              variant="ghost"
              size="sm"
              _hover={{
                bg: colorMode === "light" ? "orange.500" : "orange.500",
              }}
            >
              <FaPlus />
            </Button>
          </Link>

          <Button
            onClick={toggleColorMode}
            variant="solid"
            size="sm"
            color={colorMode === "light" ? "gray.200" : "gray.800"}
            _hover={{
              bg: colorMode === "light" ? "gray.600" : "gray.200",
            }}
          >
            {colorMode === "light" ? <FaMoon size={14} /> : <FaSun size={14} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
