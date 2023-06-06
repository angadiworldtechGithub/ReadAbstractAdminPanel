import { useState, useContext } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { Button, Input, Box, useDisclosure } from "@chakra-ui/react";
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
import DeleteBookModal from "../Components/DeleteBookModal";
import { Spinner } from "@chakra-ui/react";
import { DataContext } from "../DataContext";

function Books() {
  const [deleteId, setDeleteId] = useState("");
  const { books } = useContext(DataContext);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen_,
    onClose: onDeleteClose_,
  } = useDisclosure();

  const onDeleteOpen = (id) => () => {
    setDeleteId(id);
    onDeleteOpen_();
  };

  const onDeleteClose = () => {
    setDeleteId("");
    onDeleteClose_();
  };

  return (
    <>
      <Box padding="20px 20px 20px 20px" fontSize="30px" fontWeight="600">
        <Button colorScheme="green">
          <Link to="/bookpages">Add Books</Link>
        </Button>

        <DeleteBookModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          bookId={deleteId}
        />
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
                <Th>Book Title</Th>
                <Th>Book Image</Th>
                <Th>Author Name</Th>
                <Th>Time to Read</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!books.length ? (
                <Spinner />
              ) : (
                books.map((book) => {
                  return (
                    <Tr maxWidth="100%" key={book._id}>
                      <Td>{book.title}</Td>
                      <Td>
                        <img
                          src={`${process.env.REACT_APP_URL}/bookimage/${book.bookimage}`}
                        ></img>
                      </Td>
                      <Td>{book.authorname}</Td>
                      <Td>{book.minutes}</Td>
                      <Td>
                        <HStack spacing="10px">
                          <Button
                            onClick={onDeleteOpen(book._id)}
                            colorScheme="red"
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Books;
