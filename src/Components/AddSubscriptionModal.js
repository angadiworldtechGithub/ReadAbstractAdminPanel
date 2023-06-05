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
  Flex,
  Square,
  Link,
  Text,
  Select,
} from "@chakra-ui/react";

export default function AddSubscriptionModal({ isOpen, onClose }) {
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
        <ModalHeader> Package Details</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Add the Package Image</FormLabel>
            <Input ref={initialRef} type="file" placeholder="No file chosen" />
          </FormControl>

          <Flex color="black" paddingTop="2px">
            <HStack spacing="10px">
              <Square w="180px" bg="white" paddingLeft="5px">
                <Text>
                  <FormLabel>Package name</FormLabel>
                  <Input ref={initialRef} placeholder="Package name" />
                  <FormLabel>Package Title</FormLabel>
                  <Input ref={initialRef} placeholder="Package Title" />
                  <FormLabel>Package Type</FormLabel>
                  <Select placeholder="Package Type">
                    <option>Students</option>
                    <option>Yourself</option>
                    <option>Team</option>
                  </Select>
                </Text>
              </Square>
              <Square w="180px" bg="white" paddingLeft="5px">
                <Text>
                  <FormLabel>Package Description</FormLabel>
                  <Input ref={initialRef} placeholder="Package name" />
                  <FormLabel>Cost Including Gst</FormLabel>
                  <Input ref={initialRef} placeholder="Cost Including Gst" />
                  <FormLabel>Package Subscription</FormLabel>
                  <Select placeholder="Subscription Type">
                    <option>Yearly</option>
                    <option>Monthly</option>
                  </Select>
                </Text>
              </Square>
            </HStack>
          </Flex>

          <ModalFooter>
            <HStack spacing="20px">
              <Button colorScheme="red" onClick={onClose}>
                <Link to="">Close</Link>
              </Button>
              <Button colorScheme="green" mr={1}>
                <Link to="">Add</Link>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
