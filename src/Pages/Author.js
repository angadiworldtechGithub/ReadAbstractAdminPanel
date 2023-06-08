import { useState, useContext, useMemo } from "react";
import { CSVLink } from "react-csv";
import shortid from "shortid";
import {
  useDisclosure,
  Button,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Spinner,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import AddAuthorModal from "../Components/AddAuthorModal";
import EditAuthorModal from "../Components/EditAuthorModal";
import DeleteAuthorModal from "../Components/DeleteAuthorModal";
import { DataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import Search from "../Components/Search";
import { HEADERS } from "../utilities";
import axios from "axios";

const AUTHOR_HEADERS = ["Author Name", "Author Image", "About Author"];
const AUTHOR_KEYS = ["authorname", "authorimage", "aboutauthor"];

function Author() {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen_,
    onClose: onEditClose_,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen_,
    onClose: onDeleteClose_,
  } = useDisclosure();

  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [authorData, setAuthorData] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  const { authors, setAuthors } = useContext(DataContext);
  const { token } = useContext(AuthContext);

  const csvData = useMemo(() => {
    const data = [AUTHOR_HEADERS];
    authors.forEach((author) => {
      data.push(AUTHOR_KEYS.map((key) => author[key]));
    });
    return data;
  }, [authors]);

  const onEditOpen = (id, data) => () => {
    setEditId(id);
    setAuthorData(data);
    onEditOpen_();
  };

  const onEditClose = () => {
    setEditId("");
    setAuthorData({});
    onEditClose_();
  };

  const onDeleteOpen = (id) => () => {
    setDeleteId(id);
    onDeleteOpen_();
  };

  const onDelete = async () => {
    setDeleteLoading(true);
    await axios.post(
      `${process.env.REACT_APP_API_URL}/deleteauthor/${deleteId}`,
      {},
      {
        headers: HEADERS(token),
      }
    );
    setAuthors([...authors.filter((author) => author._id !== deleteId)]);
    setDeleteId("");
    onDeleteClose_();
    setDeleteLoading(false);
  };

  return (
    <>
      <Box paddingTop="20px" paddingLeft="20px">
        <Button colorScheme="green" onClick={onAddOpen}>
          Add Author
        </Button>

        <AddAuthorModal
          isOpen={isAddOpen}
          onClose={onAddClose}
          setAuthors={setAuthors}
        />
        <EditAuthorModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          editId={editId}
          authorData={authorData}
        />
        <DeleteAuthorModal
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
                filename={`authors_${shortid.generate()}.csv`}
              >
                Export to CSV
              </CSVLink>
            </Button>
          </Box>
          <Search
            setFilteredList={setFilteredAuthors}
            list={authors}
            key_={"authorname"}
          />
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px solid black">
          <Table variant="simple">
            <Thead>
              <Tr borderBottom="2px solid black">
                {AUTHOR_HEADERS.map((header) => {
                  if (header === "About Author") {
                    return (
                      <Box maxWidth="100%">
                        <Th>About Author</Th>
                      </Box>
                    );
                  } else return <Th>{header}</Th>;
                })}
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!authors.length ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                filteredAuthors.map((author) => {
                  return (
                    <Tr key={author._id}>
                      <Td>{author.authorname}</Td>
                      <Td>
                        <img
                          src={`${process.env.REACT_APP_URL}/authorimage/${author.authorimage}`}
                        ></img>
                      </Td>
                      <Td>{author.aboutauthor}</Td>
                      <Td>
                        <HStack spacing="10px">
                          <Button
                            onClick={onDeleteOpen(author._id)}
                            colorScheme="red"
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={onEditOpen(author._id, author)}
                            colorScheme="red"
                          >
                            Edit
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

export default Author;
