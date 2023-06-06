import { useState, useContext, useMemo } from "react";
import { CSVLink } from "react-csv";
import shortid from "shortid";
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
import AddAuthorModal from "../Components/AddAuthorModal";
import EditAuthorModal from "../Components/EditAuthorModal";
import DeleteAuthorModal from "../Components/DeleteAuthorModal";
import { DataContext } from "../DataContext";

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

  const { authors } = useContext(DataContext);

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

  const onDeleteClose = () => {
    setDeleteId("");
    onDeleteClose_();
  };

  return (
    <>
      <Box paddingTop="20px" paddingLeft="20px">
        <Button colorScheme="green" onClick={onAddOpen}>
          Add Author
        </Button>

        <AddAuthorModal isOpen={isAddOpen} onClose={onAddClose} />
        <EditAuthorModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          editId={editId}
          authorData={authorData}
        />
        <DeleteAuthorModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          deleteId={deleteId}
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
              {authors.map((author) => {
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
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Author;
