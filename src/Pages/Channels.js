import { useEffect, useState } from "react";
import axios from "axios";
import { HEADERS } from "../constants";
import { HStack, Text } from "@chakra-ui/react";
import AddChannelModal from "../Components/AddChannelModal";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [channels, setChannels] = useState([]);

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
        <Button colorScheme="green" onClick={onOpen}>
          <Link to="">Add Channel</Link>
        </Button>
        <AddChannelModal isOpen={isOpen} onClose={onClose} />
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
                        src={`${process.env.REACT_APP_STATIC_URL}/${channel.channelimage}`}
                      ></img>
                    </Td>
                    <Td>{channel.discription}</Td>
                    <Td>
                      <HStack spacing="10px">
                        <Button onClick={onOpen} colorScheme="green">
                          <Link to="">Delete</Link>
                        </Button>
                        <Button onClick={onOpen} colorScheme="green">
                          <Link to="">Edit</Link>
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
