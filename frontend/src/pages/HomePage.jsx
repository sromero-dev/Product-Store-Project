import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { Container, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack gap={8} align="center">
        <Text
          fontSize="30px"
          fontWeight="bold"
          textAlign="center"
          css={{
            background:
              "linear-gradient(to right, var(--chakra-colors-cyan-400), var(--chakra-colors-blue-500))",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
          }}
        >
          Current Products
          <BsFillRocketTakeoffFill
            style={{ display: "inline", color: "initial" }}
          />
        </Text>
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Total products: {products.length}
        </Text>

        {products && products.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              sm: 2,
              md: 3,
            }}
            gap={10}
            w="full"
          >
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" w="full" py={12}>
            <Text fontSize="xl" fontWeight="bold" color="gray.500" mb={4}>
              No products found...
            </Text>
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                cursor="pointer"
                fontSize="lg"
                fontWeight="medium"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
