import { useContext, useState, useMemo } from "react";
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
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import AddSubscriptionModal from "../Components/AddSubscriptionModal";
import DeleteSubscriptionModal from "../Components/DeleteSubscriptionModal";
import axios from "axios";
import { HEADERS } from "../constants";
import { CSVLink } from "react-csv";
import shortid from "shortid";

const SUBSCRIPTION_HEADERS = [
  "Package Name",
  "Package Type",
  "Package Photo",
  "Cost",
];
const SUBSCRIPTION_KEYS = ["packagename", "type", "packagephoto", "cost"];

function Subscription() {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen_,
    onClose: onDeleteClose_,
  } = useDisclosure();

  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { subscriptions, setSubscriptions } = useContext(DataContext);
  const { token } = useContext(AuthContext);

  const onDeleteOpen = (id) => () => {
    setDeleteId(id);
    onDeleteOpen_();
  };

  const onDelete = async () => {
    setDeleteLoading(true);
    await axios.post(
      `${process.env.REACT_APP_API_URL}/deletesubscription/${deleteId}`,
      {},
      {
        headers: HEADERS(token),
      }
    );
    setSubscriptions([
      ...subscriptions.filter((subscription) => subscription._id !== deleteId),
    ]);
    setDeleteId("");
    onDeleteClose_();
    setDeleteLoading(false);
  };

  const csvData = useMemo(() => {
    const data = [SUBSCRIPTION_HEADERS];
    subscriptions.forEach((comment) => {
      data.push(SUBSCRIPTION_KEYS.map((key) => comment[key]));
    });
    return data;
  }, [subscriptions]);

  return (
    <>
      <Box paddingTop="20px" paddingLeft="20px">
        <Button colorScheme="green" onClick={onAddOpen}>
          Add subscription
        </Button>

        <AddSubscriptionModal isOpen={isAddOpen} onClose={onAddClose} />
        <DeleteSubscriptionModal
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
                filename={`subscriptions_${shortid.generate()}.csv`}
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
              <Link to="">Clear</Link>
            </Button>
          </Box>
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px solid black">
          <Table variant="simple">
            <Thead>
              <Tr borderBottom="2px solid black">
                <Th>Package Name</Th>
                <Th>Package Type</Th>
                <Th>Package Photo</Th>
                <Th>Cost</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!subscriptions.length ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                subscriptions.map((subscription) => {
                  return (
                    <Tr>
                      <Td>{subscription.packagename}</Td>
                      <Td>{subscription.packagetype ?? "----------"}</Td>
                      <Td>
                        <img
                          src={`${process.env.REACT_APP_URL}/package/${subscription.packagephoto}`}
                        ></img>
                      </Td>
                      <Td>{subscription.cost}</Td>
                      <Td>
                        <HStack spacing="10px">
                          <Button
                            colorScheme="red"
                            onClick={onDeleteOpen(subscription._id)}
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

export default Subscription;
