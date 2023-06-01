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

function Comments() {
  return (
    <>
      {/*Modal*/}
      <Box padding="20px 20px 20px 20px" fontSize="30px" fontWeight="600">
        Comments Management
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
                <Th>User Name</Th>
                <Th>User Email</Th>
                <Th>Book Name</Th>
                <Th>Book Rating</Th>
                <Th>Comment</Th>
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
                <Td>
                  <HStack spacing="10px">
                    <Button color="white" bg="#DC3545">
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
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button color="white" bg="#DC3545">
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
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button color="white" bg="#DC3545">
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
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button color="white" bg="#DC3545">
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
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button color="white" bg="#DC3545">
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
                <Td></Td>
                <Td>
                  <HStack spacing="10px">
                    <Button color="white" bg="#DC3545">
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

export default Comments;
