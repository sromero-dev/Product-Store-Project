import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
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
      <VStack gap={8}>
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
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign="center"
            fontWeight="bold"
            color="gray.500"
          >
            No products found...{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
