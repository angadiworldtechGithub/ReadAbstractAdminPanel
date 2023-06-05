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

export default function EditAuthorModal({
  isOpen,
  onClose,
  authorId,
  authorData,
}) {
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
        <ModalHeader>Author</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Add the Author Image</FormLabel>
            <Input ref={initialRef} type="file" placeholder="No file chosen" />
          </FormControl>

          <FormControl>
            <FormLabel>Author name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Author name"
              value={authorData.authorname}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>About Author</FormLabel>
            <Input placeholder="About Author" value={authorData.aboutauthor} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <HStack spacing="20px">
            <Button colorScheme="green" onClick={onClose}>
              ModalCloseButton
            </Button>
            <Button colorScheme="red" mr={3}>
              Add Author
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
