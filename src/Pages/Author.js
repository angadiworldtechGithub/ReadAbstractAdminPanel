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

function Author() {
  {
    /*
    const headers = [
      {label:"Channel name" , key:"name"},
      {label:"Channel Image" , key:"Image"},
      {label:"Channel Description" , key:"text"},
      {label:"Action" , key:"key"}

    ]

    const App = () => {
    const [data,setData] = useState([]);

       useEffect(() => {
        fetchData();
        },[]);

     const App = () => {
        axios
          .get("http://localhost:3000/users/get")
          .then(({data}) => {
            setData(data);
          })
          .catch((error)=> alert("Error happened"));
     };
    */
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      {/*Modal*/}
      <Box paddingTop="20px" paddingLeft="20px">
        <Button colorScheme="green" onClick={onOpen}>
          Add Author
        </Button>

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
                <Input
                  ref={initialRef}
                  type="file"
                  placeholder="No file chosen"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Author name</FormLabel>
                <Input ref={initialRef} placeholder="Author name" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>About Author</FormLabel>
                <Input placeholder="About Author" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <HStack spacing="20px">
                <Button colorScheme="green" onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="red" mr={3}>
                  Add Author
                </Button>
              </HStack>
            </ModalFooter>
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
                <Th>Author Name</Th>
                <Th>Author Image</Th>
                <Box maxWidth="100%">
                  <Th>About author</Th>
                </Box>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>hshnsnsnm</Td>
                <Td>
                  <HStack spacing="10px">
                    <Button  colorScheme="red">
                      Delete
                    </Button>
                    <Button  colorScheme="red">
                      Edit
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s
                </Td>
                <Td>
                  <HStack spacing="10px">
                    <Button  colorScheme="red">
                      Delete
                    </Button>
                    <Button  colorScheme="red">
                      Edit
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td>
                  <HStack spacing="10px">
                    <Button  colorScheme="red">
                      Delete
                    </Button>
                    <Button  colorScheme="red">
                      Edit
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td>
                  <HStack spacing="10px">
                    <Button  colorScheme="red">
                      Delete
                    </Button>
                    <Button  colorScheme="red">
                      Edit
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td>
                  <HStack spacing="10px">
                    <Button  colorScheme="red">
                      Delete
                    </Button>
                    <Button  colorScheme="red">
                      Edit
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td>
                  <HStack spacing="10px">
                    <Button  colorScheme="red">
                      Delete
                    </Button>
                    <Button  colorScheme="red">
                      Edit
                    </Button>
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

export default Author;
