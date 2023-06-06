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

export default function AddChannelModal({ isOpen, onClose }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onAdd = () => {};

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader paddingTop="40px">Add Channel</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Add the Channel Image</FormLabel>
            <Input ref={initialRef} type="file" placeholder="No file chosen" />
          </FormControl>

          <FormControl>
            <FormLabel>Channel name</FormLabel>
            <Input ref={initialRef} placeholder="Channel name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Channel description</FormLabel>
            <Input placeholder="Channel description" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <HStack spacing="20px">
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onAdd} colorScheme="blue" mr={3}>
              Add Channel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
