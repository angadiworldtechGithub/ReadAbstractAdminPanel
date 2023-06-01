import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { Flex, Spacer, Center, Square } from "@chakra-ui/react";
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
  Select,
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

function Accounting() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      {/*Modal*/}
      <Box paddingTop="20px" paddingLeft="20px">
        <Button colorScheme="green" onClick={onOpen}>
          <Link to="/">Add subscription</Link>
        </Button>

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
                <Input
                  ref={initialRef}
                  type="file"
                  placeholder="No file chosen"
                />
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
                      <Input
                        ref={initialRef}
                        placeholder="Cost Including Gst"
                      />
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
                    Close
                  </Button>
                  <Button colorScheme="green" mr={1}>
                    Add Author
                  </Button>
                </HStack>
              </ModalFooter>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>

      <Box paddingLeft="20px" paddingTop="10px" paddingBottom="35px">
        <HStack spacing="100px">
          <Box w="70px" h="10" bg="white" paddingTop="25px">
            <Button color="green" bg="white" border="2px Solid green">
              Export to CSV
            </Button>
          </Box>
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
                <Th>Package Name</Th>
                <Th>Package Type</Th>
                <Th>Title</Th>
                <Th>Package Photo</Th>
                <Th>Subscription Type</Th>
                <Th>Cost</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>hshnsnsnm</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">Delete</Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">Delete</Button>
                  </HStack>
                </Td>
              </Tr>

              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">Delete</Button>
                  </HStack>
                </Td>
              </Tr>

              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">Delete</Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres</Td>
                <Td>0.91444</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">Delete</Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">Delete</Button>
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Accounting;
