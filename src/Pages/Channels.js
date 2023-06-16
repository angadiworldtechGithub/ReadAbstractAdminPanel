import { useContext, useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import shortid from "shortid";
import axios from "axios";
import {
  HStack,
  useDisclosure,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Button,
  Spinner,
} from "@chakra-ui/react";
import AddChannelModal from "../Components/AddChannelModal";
import EditChannelModal from "../Components/EditChannelModal";
import DeleteChannelModal from "../Components/DeleteChannelModal";
import { DataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import { HEADERS } from "../utilities";
import Search from "../Components/Search";

const CHANNEL_HEADERS = [
  "Channel Id",
  "Channel Name",
  "Channel Image",
  "Channel Description",
];

const CHANNEL_KEYS = ["_id", "channel", "channelimage", "discription"];

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
  const [filteredChannels, setFilteredChannels] = useState([]);

  const { channels, setChannels } = useContext(DataContext);
  const { token } = useContext(AuthContext);

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

  const onDelete = async () => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/deletechannel/${deleteId}`,
      {},
      {
        headers: HEADERS(token),
      }
    );
    setChannels([...channels.filter((channel) => channel._id !== deleteId)]);
    setDeleteId("");
    onDeleteClose_();
  };

  return (
    <>
      <Box paddingTop="20px" paddingLeft="20px">
        <Button colorScheme="green" onClick={onAddOpen}>
          Add Channel
        </Button>
        <AddChannelModal
          isOpen={isAddOpen}
          onClose={onAddClose}
          setChannels={setChannels}
        />
        <EditChannelModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          channelId={editId}
          channelData={channelData}
        />
        <DeleteChannelModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose_}
          onDelete={onDelete}
        />
      </Box>

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
          <Search
            setFilteredList={setFilteredChannels}
            list={channels}
            key_={"channel"}
          />
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px solid black">
          <Table variant="simple">
            <Thead>
              <Tr borderBottom="2px solid black">
                <Th>Channel Id</Th>
                <Th>Channel Name</Th>
                <Th>Channel Image</Th>
                <Box maxWidth="100%">
                  <Th>Channel Description</Th>
                </Box>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!channels.length ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                channels.map((channel) => {
                  return (
                    <Tr key={channel._id}>
                      <Td>{channel._id}</Td>
                      <Td>{channel.channel}</Td>
                      <Td>
                        <img
                          src={`${process.env.REACT_APP_URL}/channelimage/${channel.channelimage}`}
                        ></img>
                      </Td>
                      <Td>{channel.channeldiscription}</Td>
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
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Channels;
