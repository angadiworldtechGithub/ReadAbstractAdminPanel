import { useContext, useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import shortid from "shortid";
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
import { DataContext } from "../DataContext";

const CHANNEL_HEADERS = [
  "Channel Name",
  "Channel Image",
  "Channel Description",
];

const CHANNEL_KEYS = ["channel", "channelimage", "discription"];

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
  const { channels } = useContext(DataContext);

  const csvData = useMemo(() => {
    const data = [CHANNEL_HEADERS];
    channels.forEach((book) => {
      data.push(CHANNEL_KEYS.map((key) => book[key]));
    });
    return data;
  }, [channels]);

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
              <CSVLink
                data={csvData}
                filename={`channels_${shortid.generate()}.csv`}
              >
                Export to Csv
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
                        src={`${process.env.REACT_APP_URL}/channelimage/${channel.channelimage}`}
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
