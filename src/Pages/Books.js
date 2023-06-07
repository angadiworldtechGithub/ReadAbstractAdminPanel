import { useState, useContext, useMemo } from "react";
import { CSVLink } from "react-csv";
import shortid from "shortid";
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
import axios from "axios";
import { HEADERS } from "../constants";

const BOOK_HEADERS = [
  "Book Title",
  "Book Image",
  "Author Name",
  "Time to Read",
];

const BOOK_KEYS = ["title", "bookimage", "authorname", "minutes"];

function Books() {
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { books, setBooks } = useContext(DataContext);
  const csvData = useMemo(() => {
    const data = [BOOK_HEADERS];
    books.forEach((book) => {
      data.push(BOOK_KEYS.map((key) => book[key]));
    });
    return data;
  }, [books]);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen_,
    onClose: onDeleteClose_,
  } = useDisclosure();

  const onDeleteOpen = (id) => () => {
    setDeleteId(id);
    onDeleteOpen_();
  };

  const onDelete = async () => {
    setDeleteLoading(true);
    await axios.post(
      `${process.env.REACT_APP_API_URL}/deletebook/${deleteId}`,
      {},
      {
        headers: HEADERS,
      }
    );
    setBooks([...books.filter((book) => book._id !== deleteId)]);
    setDeleteId("");
    onDeleteClose_();
    setDeleteLoading(false);
  };

  return (
    <>
      <Box padding="20px 20px 20px 20px" fontSize="30px" fontWeight="600">
        <Button colorScheme="green">
          <Link to="/bookpages">Add Books</Link>
        </Button>

        <DeleteBookModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose_}
          onDelete={onDelete}
          loading={deleteLoading}
        />
      </Box>

      <Box paddingLeft="20px" paddingTop="10px" paddingBottom="35px">
        <HStack spacing="100px">
          <Box w="70px" h="10" bg="white" paddingTop="25px">
            <Button color="green" bg="white" border="2px Solid green">
              <CSVLink
                data={csvData}
                filename={`books_${shortid.generate()}.csv`}
              >
                Export to CSV
              </CSVLink>
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
                {BOOK_HEADERS.map((header) => (
                  <Th>{header}</Th>
                ))}
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
