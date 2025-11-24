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

  console.log(products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          Current Products <BsFillRocketTakeoffFill />
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            md: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard product={product} key={product._id}></ProductCard>
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No products found...{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color={"blue.500"}
                cursor={"pointer"}
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
