import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { Button, Input, Box } from "@chakra-ui/react";
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

function UserManagement() {
  return (
    <>
      {/*Modal*/}
      <Box padding="20px 20px 20px 20px" fontSize="30px" fontWeight="600">
        User Feedback Management
      </Box>

      <Box paddingLeft="20px" paddingTop="10px" paddingBottom="35px">
        <HStack spacing="100px">
          <Box w="70px" h="10" bg="white" paddingTop="25px">
            <Button color="green" bg="white" border="2px Solid green">
              <Link to="/">Export to CSV</Link>
            </Button>
          </Box>
          <Box w="170px" h="15" bg="white" paddingBottom="35px">
            <Text>Search this table</Text>
            <Input w="250px" border="3px Solid skyblue" placeholder="Search" />
          </Box>
          <Box w="180px" h="10" bg="white" paddingTop="25px">
            <Button color="skyblue" bg="white" border="2px Solid skyblue">
              <Link to="/">Clear</Link>
            </Button>
          </Box>
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px Solid black">
          <Table variant="simple">
            <Thead>
              <Tr border="2px Solid black">
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Feedback</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Angadi</Td>
                <Td>Angadiworldtech@gmail.com</Td>
                <Td>Good Growth in company Growth in company</Td>
                <Td>13/06/2023</Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red">
                      Delete
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

export default UserManagement;
