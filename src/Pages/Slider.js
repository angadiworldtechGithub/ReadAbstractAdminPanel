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

function Slider() {
  {
    /*
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
          <Link to="">Add Slider</Link> 
        </Button>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Slider</ModalHeader>
            <hr></hr>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Add the Slider Image</FormLabel>
                <Input
                  ref={initialRef}
                  type="file"
                  placeholder="No file chosen"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <HStack spacing="20px">
                <Button colorScheme="red" onClick={onClose}>
                   <Link to="">Cancle</Link>
                </Button>
                <Button colorScheme="green" mr={3}>
                <Link to="">Save</Link>
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
              <Link to=""> Clear </Link>
            </Button>
          </Box>
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px Solid black">
          <Table variant="simple">
            <Thead>
              <Tr border="2px Solid black">
                <Th>Slider Image</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  inches Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
                  Lorem{" "}
                </Td>
                <Td>
                  <HStack spacing="20px">
                    <Button colorScheme="red" onClick={onClose}>
                      <Link to=""> Cancle</Link>
                    </Button>
                    <Button colorScheme="red" mr={3}>
                    <Link to=""> Save</Link>
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

export default Slider;
