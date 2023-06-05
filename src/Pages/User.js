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
import EditUserModal from "../Components/EditUserModal";
import DeleteUserModal from "../Components/DeleteUserModal";

function User() {
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
  const [userData, setUserData] = useState({});

  const { users } = useContext(DataContext);

  const onEditOpen = (id, data) => () => {
    setEditId(id);
    setUserData(data);
    onEditOpen_();
  };

  const onEditClose = () => {
    setEditId("");
    setUserData({});
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
        <Box padding="20px 20px 20px 20px" fontSize="30px" fontWeight="600">
          User
        </Box>
        <EditUserModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          userId={editId}
          userData={userData}
        />
        <DeleteUserModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          userId={deleteId}
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
              <Link to=""> Clear </Link>
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
                <Th>Name</Th>
                <Th>Phone Number</Th>
                <Th>Email</Th>
                <Th>Profile Photo</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => {
                return (
                  <Tr>
                    <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.mobilenumber}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <img
                        src={`${process.env.REACT_APP_STATIC_URL}/profile/${user.profilephoto}`}
                      ></img>
                    </Td>
                    <Td>{user.status}</Td>
                    <Td>
                      <HStack spacing="10px">
                        <Button
                          colorScheme="red"
                          onClick={onDeleteOpen(user._id)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={onEditOpen(user._id, user)}
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

export default User;
