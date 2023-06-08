import { useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import {
  Button,
  Box,
  HStack,
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
import shortid from "shortid";
import { DataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { HEADERS } from "../utilities";
import DeleteCommentModal from "../Components/DeleteCommentModal";
import Search from "../Components/Search";
import axios from "axios";

const COMMENT_HEADERS = ["User ID", "Book ID", "Comment"];
const COMMENT_KEYS = ["userid", "bookid", "comment"];

function Comments() {
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);

  const { comments, setComments } = useContext(DataContext);
  const { token } = useContext(AuthContext);

  const csvData = useMemo(() => {
    const data = [COMMENT_HEADERS];
    comments.forEach((comment) => {
      data.push(COMMENT_KEYS.map((key) => comment[key]));
    });
    return data;
  }, [comments]);

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
        headers: HEADERS(token),
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
          <Search
            setFilteredList={setFilteredComments}
            list={comments}
            key_={"comment"}
          />
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px solid black">
          <Table variant="simple">
            <Thead>
              <Tr borderBottom="2px solid black">
                <Th>User Id</Th>
                <Th>Book Id</Th>
                <Th>Comment</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!comments.length ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                filteredComments.map((comment) => {
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
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Comments;
