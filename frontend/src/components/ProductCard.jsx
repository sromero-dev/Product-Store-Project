import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  Text,
  VStack,
  Dialog,
  Portal,
  FormatNumber,
  Field,
  defineStyle,
  useControllableState,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { useState } from "react";
import { toaster } from "../components/ui/toaster";
import { AdminPasswordModal } from "./AdminPasswordModal";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [open, setOpen] = useState(false);
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
    setOpen(false);
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
          fontSize="md"
          color={{ base: "gray.600", _dark: "gray.200" }}
          mb={4}
        >
          <FormatNumber value={product.price} style="currency" currency="EUR" />
        </Text>

        <HStack gap={2}>
          <IconButton
            size={"sm"}
            onClick={() => setOpen(true)}
            colorPalette="blue"
          >
            <FaEdit />
          </IconButton>
          <IconButton
            onClick={handleDeleteClick}
            colorPalette="red"
            size={"sm"}
          >
            <FaTrash />
          </IconButton>
        </HStack>
      </Box>

      <Dialog.Root
        placement={"center"}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack gap={5} pt={2}>
                  <FloatingLabelInput
                    label="Product Name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <InputGroup startElement="€" endElement="EUR">
                    <Input
                      placeholder="Price"
                      name="price"
                      type="string"
                      value={updatedProduct.price}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                  <InputGroup startElement="https://">
                    <Input
                      placeholder="Image URL"
                      name="image"
                      value={updatedProduct.image}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          image: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </VStack>
              </Dialog.Body>

              <Dialog.Footer>
                <Button
                  colorPalette="blue"
                  marginBottom={1}
                  onClick={handleUpdateClick}
                >
                  Save
                </Button>
                <Dialog.CloseTrigger asChild>
                  <Button variant="ghost">Cancel</Button>
                </Dialog.CloseTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <AdminPasswordModal
        isOpen={showDeletePasswordModal}
        onClose={() => setShowDeletePasswordModal(false)}
        onConfirm={(password) => handleDeleteProduct(product._id, password)}
        isLoading={isDeleting}
      />

      <AdminPasswordModal
        isOpen={showUpdatePasswordModal}
        onClose={() => setShowUpdatePasswordModal(false)}
        onConfirm={(password) => handleUpdateProduct(product._id, updatedProduct, password)}
        isLoading={isUpdating}
      />
    </Box>
  );
};

export default ProductCard;

const FloatingLabelInput = (props) => {
  const { label, onValueChange, value, defaultValue = "", ...rest } = props;

  const [inputState, setInputState] = useControllableState({
    defaultValue,
    onChange: onValueChange,
    value,
  });

  const [focused, setFocused] = useState(false);
  const shouldFloat = inputState?.length > 0 || focused || value?.length > 0;

  return (
    <Box pos="relative" w="full">
      <Input
        {...rest}
        placeholder=" "
        onFocus={(e) => {
          props.onFocus?.(e);
          setFocused(true);
        }}
        onBlur={(e) => {
          props.onBlur?.(e);
          setFocused(false);
        }}
        onChange={(e) => {
          props.onChange?.(e);
          setInputState(e.target.value);
        }}
        value={inputState}
        data-float={shouldFloat || undefined}
        pt="4"
        pb="1"
        h="12"
      />
      <Field.Label css={floatingStyles} data-float={shouldFloat || undefined}>
        {label}
      </Field.Label>
    </Box>
  );
};

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "3",
  insetStart: "3",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "all 0.2s ease-out",
  color: "fg.muted",
  _dark: {
    bg: "gray.800",
  },
  "&[data-float]": {
    top: "-2.5",
    insetStart: "2",
    color: "blue.500",
    fontSize: "sm",
    fontWeight: "medium",
    zIndex: 2,
  },
});
