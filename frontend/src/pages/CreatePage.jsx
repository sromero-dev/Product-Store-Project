import {
  VStack,
  Heading,
  Box,
  Container,
  Input,
  Button,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
      duration: 3000,
    });

    if (!success) return;

    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
    setImageError(false);
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setNewProduct({ ...newProduct, image: url });
    setImageError(false);
    setImageLoading(true);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <Container
      maxW="container.sm"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="80vh"
    >
      <VStack w="full">
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>
        <Box
          w="100%"
          maxW="500px"
          bg="white"
          _dark={{ bg: "gray.800" }}
          p={6}
          borderRadius="lg"
          boxShadow="md"
        >
          <VStack gap={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price (e.g., 19.99)"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Box w="full">
              <Text mb={2} fontSize="sm" fontWeight="medium">
                Image URL
              </Text>
              <Input
                placeholder="Paste image URL from internet (e.g., https://...)"
                name="image"
                value={newProduct.image}
                onChange={handleImageUrlChange}
                borderColor={imageError ? "red.500" : undefined}
              />
              {imageError && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  Invalid image URL. Please check and try again.
                </Text>
              )}
            </Box>

            {/* Image Preview */}
            {newProduct.image && (
              <Box
                w="full"
                h="200px"
                bg="gray.100"
                _dark={{ bg: "gray.700" }}
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                {imageLoading && <Text color="gray.500">Loading image...</Text>}
                {!imageLoading && !imageError && (
                  <Image
                    src={newProduct.image}
                    alt="Product preview"
                    maxH="100%"
                    maxW="100%"
                    objectFit="contain"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                )}
                {imageError && (
                  <Text color="red.500" textAlign="center" px={4}>
                    Could not load image
                  </Text>
                )}
              </Box>
            )}

            <Text fontSize="xs" color="gray.500" w="full">
              💡 Tip: Search for image URLs on{" "}
              <Link
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Unsplash
              </Link>
              ,{" "}
              <Link
                href="https://pexels.com"
                target="_blank"
                rel="noopener noreferrer"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Pexels
              </Link>
              , or{" "}
              <Link
                href="https://pixabay.com"
                target="_blank"
                rel="noopener noreferrer"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Pixabay
              </Link>{" "}
              and paste the direct image link here.
            </Text>

            <Button
              colorPalette="blue"
              onClick={handleAddProduct}
              w="full"
              disabled={imageError || !newProduct.image}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
