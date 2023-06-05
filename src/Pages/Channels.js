import { useEffect, useState } from "react";
import axios from "axios";
import { HEADERS } from "../constants";
import { HStack, Text } from "@chakra-ui/react";
import AddChannelModal from "../Components/AddChannelModal";
import EditChannelModal from "../Components/EditChannelModal";
import DeleteChannelModal from "../Components/DeleteChannelModal";
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

function Channels() {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
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
  const [channelData, setChannelData] = useState({});
  const [channels, setChannels] = useState([]);

  const onEditOpen = (id, data) => () => {
    setEditId(id);
    setChannelData(data);
    onEditOpen_();
  };

  const onEditClose = () => {
    setEditId("");
    setChannelData({});
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

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/getallchannel`,
        {
          headers: HEADERS,
        }
      );
      setChannels(data.channel);
    })();
  }, []);

  return (
    <>
      <Box paddingTop="20px" paddingLeft="20px">
        <Button colorScheme="green" onClick={onAddOpen}>
          Add Channel
        </Button>
        <AddChannelModal isOpen={isAddOpen} onClose={onAddClose} />
        <EditChannelModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          channelId={editId}
          channelData={channelData}
        />
        <DeleteChannelModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          channelId={deleteId}
        />
      </Box>

      <Box paddingTop="20px" paddingLeft="20px"></Box>

      <Box paddingLeft="20px" paddingTop="10px" paddingBottom="35px">
        <HStack spacing="100px">
          <Box w="70px" h="10" bg="white" paddingTop="25px">
            <Button color="green" bg="white" border="2px Solid green">
              <Link to="">Export to Csv</Link>
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
        <TableContainer border="2px Solid black">
          <Table variant="simple">
            <Thead>
              <Tr border="2px Solid black">
                <Th>Channel Name</Th>
                <Th>Channel Image</Th>
                <Box maxWidth="100%">
                  <Th>Channel Description</Th>
                </Box>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {channels.map((channel) => {
                return (
                  <Tr key={channel._id}>
                    <Td>{channel.channel}</Td>
                    <Td>
                      <img
                        src={`${process.env.REACT_APP_STATIC_URL}/channelimage/${channel.channelimage}`}
                      ></img>
                    </Td>
                    <Td>{channel.discription}</Td>
                    <Td>
                      <HStack spacing="10px">
                        <Button
                          onClick={onDeleteOpen(channel._id)}
                          colorScheme="green"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={onEditOpen(channel._id, channel)}
                          colorScheme="green"
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

export default Channels;
