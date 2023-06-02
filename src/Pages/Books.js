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

function Books() {
  return (
    <>
      {/*Modal*/}
      <Box padding="20px 20px 20px 20px" fontSize="30px" fontWeight="600">
        <Button colorScheme="green">
          <Link to="/bookpages">Add Books</Link>
        </Button>
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
        <TableContainer border="2px Solid black" width="100%">
          <Table variant="simple">
            <Thead>
              <Tr border="2px Solid black">
                <Th>Channel Name</Th>
                <Th>Book Title</Th>
                <Th>Book Image</Th>
                <Th>Author Name</Th>
                <Th>Publication & Year</Th>
                <Th>Type</Th>
                <Th>Time to Read</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr maxWidth="100%">
                <Td>Angadi</Td>
                <Td>AngadiworldtechAngadiworldtech</Td>
                <Td>Good Growth</Td>
                <Td>13/06/2023</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red"><Link to="" >Delete</Link></Button>
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
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red"><Link to="" >Delete</Link></Button>
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
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red"><Link to="" >Delete</Link></Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red"><Link to="" >Delete</Link></Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr maxWidth="20px">
                <Td maxWidth="20px">yards metresmetresmetresmetresmetresmetresmetresmetresmetres</Td>
                <Td>metres (m)</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red"><Link to="" >Delete</Link></Button>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button colorScheme="red"><Link to="" >Delete</Link></Button>
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

export default Books;
