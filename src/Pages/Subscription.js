import { useContext, useState } from "react";
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
import { Link } from "react-router-dom";
import { DataContext } from "../DataContext";
import AddSubscriptionModal from "../Components/AddSubscriptionModal";
import DeleteSubscriptionModal from "../Components/DeleteSubscriptionModal";

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

  const { subscriptions } = useContext(DataContext);

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
          Add subscription
        </Button>

        <AddSubscriptionModal isOpen={isAddOpen} onClose={onAddClose} />
        <DeleteSubscriptionModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          deleteId={deleteId}
        />
      </Box>

      <Box paddingLeft="20px" paddingTop="10px" paddingBottom="35px">
        <HStack spacing="100px">
          <Box w="70px" h="10" bg="white" paddingTop="25px">
            <Button color="green" bg="white" border="2px Solid green">
              <Link to="">Export to CSV</Link>
            </Button>
          </Box>
          <Box w="170px" h="15" bg="white" paddingBottom="35px">
            <Text>Search this table</Text>
            <Input w="250px" border="3px Solid skyblue" placeholder="Search" />
          </Box>
          <Box w="180px" h="10" bg="white" paddingTop="25px">
            <Button color="skyblue" bg="white" border="2px Solid skyblue">
              <Link to=""> Clear</Link>
            </Button>
          </Box>
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px Solid black">
          <Table variant="simple">
            <Thead>
              <Tr border="2px Solid black">
                <Th>Package Name</Th>
                <Th>Package Type</Th>
                <Th>Package Photo</Th>
                <Th>Cost</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subscriptions.map((subscription) => {
                return (
                  <Tr>
                    <Td>{subscription.packagename}</Td>
                    <Td>{subscription.type ?? "----------"}</Td>
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
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Subscription;
