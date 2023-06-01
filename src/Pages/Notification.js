import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Notification() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      {/*Modal*/}
      <Box paddingTop="20px" paddingLeft="20px">
        <Button colorScheme="green" onClick={onOpen}>
          Add Notification
        </Button>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Notification</ModalHeader>
            <hr></hr>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Notification</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  placeholder="Enter Notification"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <HStack spacing="20px">
                <Button colorScheme="red" onClick={onClose}>
                  Cancle
                </Button>
                <Button colorScheme="green" mr={3}>
                  Save
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <Box paddingLeft="20px" paddingTop="10px" paddingBottom="35px">
        <HStack spacing="100px">
          <Box w="170px" h="15" bg="white" paddingBottom="35px">
            <Text>Search this table</Text>
            <Input w="250px" border="3px Solid skyblue" placeholder="Search" />
          </Box>
          <Box w="180px" h="10" bg="white" paddingTop="25px">
            <Button color="skyblue" bg="white" border="2px Solid skyblue">
              Clear
            </Button>
          </Box>
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px Solid black">
          <Table variant="simple">
            <Thead>
              <Tr border="2px Solid black">
                <Th>Notification</Th>
                <Th>Date & Time</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </Td>
                <Td> 31/01/2023 & 01:12:45</Td>
                <Td>
                  <HStack spacing="20px">
                    <Button colorScheme="red" onClick={onClose}>
                      Cancle
                    </Button>
                    <Button colorScheme="red" mr={3}>
                      Save
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Notification;
