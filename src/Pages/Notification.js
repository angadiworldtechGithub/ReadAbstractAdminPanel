import { useContext, useState } from "react";
import {
  useDisclosure,
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import AddNotificationModal from "../Components/AddNotificationModal";
import { DataContext } from "../Context/DataContext";
import Search from "../Components/Search";

function Notification() {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const [filteredNotifications, setFilteredNotifications] = useState([]);

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
          <Search
            setFilteredList={setFilteredNotifications}
            list={notifications}
            key_={"text"}
          />
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
                filteredNotifications.map((notification) => {
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
