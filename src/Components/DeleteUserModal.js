import { useRef } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  HStack,
} from "@chakra-ui/react";

import { Spinner } from "@chakra-ui/react";

export default function DeleteUserModal({
  isOpen,
  onClose,
  onDelete,
  loading,
}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader paddingTop="40px">Delete User</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalFooter>
          <HStack spacing="20px">
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onDelete} colorScheme="blue" mr={3}>
              {loading ? <Spinner /> : "Delete User"}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
