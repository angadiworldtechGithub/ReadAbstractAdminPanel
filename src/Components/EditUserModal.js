import { useRef } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from "@chakra-ui/react";

export default function EditUserModal({ isOpen, onClose, userId, userData }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onEdit = () => {};

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Update Profile Photo</FormLabel>
            <Input ref={initialRef} type="file" placeholder="No file chosen" />
          </FormControl>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Author name"
              value={userData.name}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <HStack spacing="20px">
            <Button colorScheme="green" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" mr={3}>
              Edit User
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
