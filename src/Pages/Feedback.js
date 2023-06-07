import { useMemo, useState, useContext } from "react";
import { HStack, Text, useDisclosure } from "@chakra-ui/react";
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
import { DataContext } from "../DataContext";
import { CSVLink } from "react-csv";
import shortid from "shortid";
import axios from "axios";
import { HEADERS } from "../constants";
import DeleteFeedbackModal from "../Components/DeleteFeedbackModal";

const FEEDBACK_HEADERS = ["User Id", "Feedback", "Rating", "Date"];
const FEEDBACK_KEYS = ["userid", "feedback", "rating", "placeddate"];

export default function Feedback() {
  const { feedbacks, setFeedbacks } = useContext(DataContext);

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
        headers: HEADERS,
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
                <Th>Feedback</Th>
                <Th>Rating</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {feedbacks.map((feedback) => {
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
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
