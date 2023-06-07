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

export default function DeleteCommentModal({
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
        <ModalHeader paddingTop="40px">Delete Comment</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalFooter>
          <HStack spacing="20px">
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onDelete} colorScheme="blue" mr={3}>
              {loading ? <Spinner /> : "Delete Comment"}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
