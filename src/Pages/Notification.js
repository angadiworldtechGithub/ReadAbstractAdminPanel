import { useContext } from "react";
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
import AddNotificationModal from "../Components/AddNotificationModal";
import { DataContext } from "../Context/DataContext";

function Notification() {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const { notifications, setNotifications } = useContext(DataContext);

  return (
    <>
      <Box paddingTop="20px" paddingLeft="20px">
        <Button colorScheme="green" onClick={onAddOpen}>
          Add Notification
        </Button>
        <AddNotificationModal
          isOpen={isAddOpen}
          onClose={onAddClose}
          setNotifications={setNotifications}
        />
      </Box>

      <Box paddingLeft="20px" paddingTop="10px" paddingBottom="35px">
        <HStack spacing="100px">
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
                <Th>Notification</Th>
                <Th>Date & Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!notifications.length ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                notifications.map((notification) => {
                  return (
                    <Tr>
                      <Td>{notification.text}</Td>
                      <Td>{notification.createdAt}</Td>
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

export default Notification;
