import { useMemo, useState, useContext } from "react";
import { CSVLink } from "react-csv";
import shortid from "shortid";
import axios from "axios";
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
import { DataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import { HEADERS } from "../constants";
import DeleteFeedbackModal from "../Components/DeleteFeedbackModal";
import Search from "../Components/Search";

const FEEDBACK_HEADERS = ["User Id", "Feedback", "Rating", "Date"];
const FEEDBACK_KEYS = ["userid", "feedback", "rating", "placeddate"];

export default function Feedback() {
  const { feedbacks, setFeedbacks } = useContext(DataContext);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const { token } = useContext(AuthContext);

  const csvData = useMemo(() => {
    const data = [FEEDBACK_HEADERS];
    feedbacks.forEach((comment) => {
      data.push(FEEDBACK_KEYS.map((key) => comment[key]));
    });
    return data;
  }, [feedbacks]);

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
      `${process.env.REACT_APP_API_URL}/deletefeedback/${deleteId}`,
      {},
      {
        headers: HEADERS(token),
      }
    );
    setFeedbacks([
      ...feedbacks.filter((feedback) => feedback._id !== deleteId),
    ]);
    setDeleteId("");
    onDeleteClose_();
    setDeleteLoading(false);
  };
  return (
    <>
      <Box padding="20px 20px 20px 20px" fontSize="30px" fontWeight="600">
        Feedback
        <DeleteFeedbackModal
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
                filename={`feedbacks_${shortid.generate()}.csv`}
              >
                Export to CSV
              </CSVLink>
            </Button>
          </Box>
          <Search
            setFilteredList={setFilteredFeedback}
            list={feedbacks}
            key_={"feedback"}
          />
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px solid black">
          <Table variant="simple">
            <Thead>
              <Tr borderBottom="2px solid black">
                <Th>User Id</Th>
                <Th>Feedback</Th>
                <Th>Rating</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!feedbacks.length ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                filteredFeedback.map((feedback) => {
                  return (
                    <Tr>
                      <Td>{feedback.userid}</Td>
                      <Td>{feedback.feedback}</Td>
                      <Td>{feedback.rating}</Td>
                      <Td>{feedback.placeddate}</Td>
                      <Td>
                        <HStack spacing="10px">
                          <Button
                            colorScheme="red"
                            onClick={onDeleteOpen(feedback._id)}
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
