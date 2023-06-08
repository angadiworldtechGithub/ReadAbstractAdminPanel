import { useState, useContext, useMemo } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import shortid from "shortid";
import {
  HStack,
  Button,
  Box,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DeleteBookModal from "../Components/DeleteBookModal";
import { DataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import { HEADERS } from "../utilities";
import Search from "../Components/Search";

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
  const [filteredBooks, setFilteredBooks] = useState([]);

  const { books, setBooks } = useContext(DataContext);
  const { token } = useContext(AuthContext);

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
        headers: HEADERS(token),
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
          <Search
            setFilteredList={setFilteredBooks}
            list={books}
            key_={"title"}
          />
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px solid black" width="100%">
          <Table variant="simple">
            <Thead>
              <Tr borderBottom="2px solid black">
                {BOOK_HEADERS.map((header) => (
                  <Th>{header}</Th>
                ))}
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!books.length ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                filteredBooks.map((book) => {
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
