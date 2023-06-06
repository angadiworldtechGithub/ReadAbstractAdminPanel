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

export default function DeleteCommentModal({ isOpen, onClose, commentId }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onDelete = () => {};

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
              Delete Comment
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
