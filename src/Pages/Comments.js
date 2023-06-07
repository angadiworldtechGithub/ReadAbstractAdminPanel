import { useMemo, useState } from "react";
import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { Button, Input, Box } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
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
import shortid from "shortid";
import { DataContext } from "../DataContext";
import { useContext } from "react";
import axios from "axios";
import { HEADERS } from "../constants";
import DeleteCommentModal from "../Components/DeleteCommentModal";

const COMMENT_HEADERS = ["User ID", "Book ID", "Comment"];
const COMMENT_KEYS = ["userid", "bookid", "comment"];

function Comments() {
  const { comments, setComments } = useContext(DataContext);
  const csvData = useMemo(() => {
    const data = [COMMENT_HEADERS];
    comments.forEach((comment) => {
      data.push(COMMENT_KEYS.map((key) => comment[key]));
    });
    return data;
  }, [comments]);

  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

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
      `${process.env.REACT_APP_API_URL}/deletecomment/${deleteId}`,
      {},
      {
        headers: HEADERS,
      }
    );
    setComments([...comments.filter((comment) => comment._id !== deleteId)]);
    setDeleteId("");
    onDeleteClose_();
    setDeleteLoading(false);
  };

  return (
    <>
      <Box padding="20px 20px 20px 20px" fontSize="30px" fontWeight="600">
        Comments
        <DeleteCommentModal
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
                filename={`comments_${shortid.generate()}.csv`}
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
        <TableContainer border="2px Solid black">
          <Table variant="simple">
            <Thead>
              <Tr border="2px Solid black">
                <Th>User Id</Th>
                <Th>Book Id</Th>
                <Th>Comment</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {comments.map((comment) => {
                return (
                  <Tr key={comment._id}>
                    <Td>{comment.userid}</Td>
                    <Td>{comment.bookid}</Td>
                    <Td>{comment.comment}</Td>
                    <Td>
                      <HStack spacing="10px">
                        <Button
                          colorScheme="red"
                          onClick={onDeleteOpen(comment._id)}
                        >
                          Delete
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

export default Comments;
