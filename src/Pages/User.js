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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DataContext } from "../DataContext";
import EditUserModal from "../Components/EditUserModal";
import DeleteUserModal from "../Components/DeleteUserModal";
import { CSVLink } from "react-csv";
import shortid from "shortid";
import axios from "axios";
import { HEADERS } from "../constants";

const USER_HEADERS = [
  "User Id",
  "Name",
  "Phone Number",
  "Email",
  "Profile Photo",
  "Status",
];
const USER_KEYS = [
  "_id",
  "name",
  "mobilenumber",
  "email",
  "profilephoto",
  "status",
];

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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { users, setUsers } = useContext(DataContext);

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

  const onDelete = async () => {
    setDeleteLoading(true);
    await axios.post(
      `${process.env.REACT_APP_API_URL}/deleteuser/${deleteId}`,
      {},
      {
        headers: HEADERS,
      }
    );
    setUsers([...users.filter((user) => user._id !== deleteId)]);
    setDeleteId("");
    onDeleteClose_();
    setDeleteLoading(false);
  };

  const csvData = useMemo(() => {
    const data = [USER_HEADERS];
    users.forEach((comment) => {
      data.push(USER_KEYS.map((key) => comment[key]));
    });
    return data;
  }, [users]);

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
                filename={`users_${shortid.generate()}.csv`}
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
                  <Tr key={user._id}>
                    <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.mobilenumber}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <img
                        src={`${process.env.REACT_APP_URL}/profile/${user.profilephoto}`}
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
