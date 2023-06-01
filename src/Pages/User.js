import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { useDisclosure, Button, Input, Box } from "@chakra-ui/react";
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

function User() {
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
        <Box padding="20px 20px 20px 20px" fontSize="30px" fontWeight="600">
          User
        </Box>
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
                <Th>User Id</Th>
                <Th>Name</Th>
                <Th>Phone Number</Th>
                <Th>Profile Photo</Th>
                <Th>Referral Phone Number</Th>
                <Th>Status </Th>
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
                    <Button color="white" bg="#DC3545">
                      Delete
                    </Button>
                    <Button color="white" bg="#DC3545">
                      Edit
                    </Button>
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
                    <Button color="white" bg="#DC3545">
                      Delete
                    </Button>
                    <Button color="white" bg="#DC3545">
                      Edit
                    </Button>
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
                    <Button color="white" bg="#DC3545">
                      Delete
                    </Button>
                    <Button color="white" bg="#DC3545">
                      Edit
                    </Button>
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
                    <Button color="white" bg="#DC3545">
                      Delete
                    </Button>
                    <Button color="white" bg="#DC3545">
                      Edit
                    </Button>
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
                    <Button color="white" bg="#DC3545">
                      Delete
                    </Button>
                    <Button color="white" bg="#DC3545">
                      Edit
                    </Button>
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
                    <Button color="white" bg="#DC3545">
                      Delete
                    </Button>
                    <Button color="white" bg="#DC3545">
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

export default User;
