import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { useState } from "react";
import { toaster } from "./ui/toaster";
import { AdminPasswordModal } from "./AdminPasswordModal";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeletePasswordModal, setShowDeletePasswordModal] = useState(false);
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid, adminPassword) => {
    setIsDeleting(true);
    const { success, message } = await deleteProduct(pid, adminPassword);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
      duration: 3000,
    });
    setIsDeleting(false);
    setShowDeletePasswordModal(false);
  };

  const handleDeleteClick = () => {
    setShowDeletePasswordModal(true);
  };

  const handleUpdateClick = () => {
    setShowUpdatePasswordModal(true);
  };

  const handleUpdateProduct = async (pid, updatedProduct, adminPassword) => {
    const price = updatedProduct.price;

    if (!price || price.trim() === "" || price < 0) return;

    if (!/^\d+(\.\d+)?$/.test(price)) {
      toaster.create({
        title: "Error",
        description:
          "Price must contain only numbers, optionally with one decimal point",
        type: "error",
        duration: 3000,
      });
      return;
    }
    if ((price.match(/\./g) || []).length > 1) {
      toaster.create({
        title: "Error",
        description: "Price can only contain one decimal point",
        type: "error",
        duration: 3000,
      });
      return;
    }
    if (price.includes(",") && price.includes(".")) {
      toaster.create({
        title: "Error",
        description: "Price cannot contain both comma and dot as separators",
        type: "error",
        duration: 3000,
      });
      return;
    }
    const numericPrice = parseFloat(price.replace(",", "."));
    if (isNaN(numericPrice)) {
      toaster.create({
        title: "Error",
        description: "Price must be a valid number",
        type: "error",
        duration: 3000,
      });
      return;
    }
    const roundedPrice = numericPrice.toFixed(2);
    updatedProduct.price = roundedPrice.toString();

    const { success, message } = await updateProduct(
      pid,
      updatedProduct,
      adminPassword,
    );
    setShowUpdateModal(false);
    setIsUpdating(false);
    setShowUpdatePasswordModal(false);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
      duration: 3000,
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={{ base: "white", _dark: "gray.800" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="xl" mb={2}>
          {product.name}
        </Heading>

        <Text
          fontWeight="bold"
          fontSize="lg"
          color={{ base: "gray.600", _dark: "gray.200" }}
          mb={4}
        >
          €{parseFloat(product.price).toFixed(2)}
        </Text>

        <HStack gap={2}>
          <IconButton
            size="sm"
            colorPalette="blue"
            onClick={() => setShowUpdateModal(true)}
          >
            <FaEdit />
          </IconButton>
          <IconButton onClick={handleDeleteClick} colorPalette="red" size="sm">
            <FaTrash />
          </IconButton>
        </HStack>
      </Box>

      {/* Update Modal */}
      {showUpdateModal && (
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
          onClick={() => setShowUpdateModal(false)}
        >
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="lg"
            p={6}
            maxW="500px"
            w="90%"
            onClick={(e) => e.stopPropagation()}
          >
            <Heading size="md" mb={4}>
              Update Product
            </Heading>
            <VStack gap={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Price"
                type="number"
                step="0.01"
                min="0"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
            <HStack gap={2} mt={6}>
              <Button colorPalette="blue" onClick={handleUpdateClick} flex={1}>
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowUpdateModal(false)}
                flex={1}
              >
                Cancel
              </Button>
            </HStack>
          </Box>
        </Box>
      )}

      <AdminPasswordModal
        isOpen={showDeletePasswordModal}
        onClose={() => setShowDeletePasswordModal(false)}
        onConfirm={(password) => handleDeleteProduct(product._id, password)}
        isLoading={isDeleting}
      />

      <AdminPasswordModal
        isOpen={showUpdatePasswordModal}
        onClose={() => setShowUpdatePasswordModal(false)}
        onConfirm={(password) =>
          handleUpdateProduct(product._id, updatedProduct, password)
        }
        isLoading={isUpdating}
      />
    </Box>
  );
};

export default ProductCard;
