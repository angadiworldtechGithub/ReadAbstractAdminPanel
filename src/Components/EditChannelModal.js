import { useContext, useRef, useState, useMemo } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from "@chakra-ui/react";
import { DataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import { FILE_HEADERS } from "../utilities";
import SpinnerButton from "./SpinnerButton";

export default function EditChannelModal({
  isOpen,
  onClose,
  channelId,
  channelData,
}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useMemo(() => {
    setName(channelData.channel);
    setDescription(channelData.channeldiscription);
  }, [channelData]);

  const { token } = useContext(AuthContext);
  const { setChannels } = useContext(DataContext);

  const onEdit = async () => {
    if (name !== "" && description !== "") {
      setLoading(true);
      const {
        data: { channel },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/editchannel/${channelId}`,
        {
          channelimage: initialRef.current.files[0],
          channel: name,
          channeldiscription: description,
        },
        {
          headers: FILE_HEADERS(token),
        }
      );
      console.log(channel);
      setChannels((channels) => {
        const index = channels.findIndex(
          (channel_) => channel_._id === channelId
        );
        channels[index] = { ...channel };
        return [...channels];
      });
      onClose();
      setLoading(false);
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader paddingTop="40px">Edit Channel</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Edit the Channel Image</FormLabel>
            <Input ref={initialRef} type="file" placeholder="No file chosen" />
          </FormControl>

          <FormControl>
            <FormLabel>Channel Name</FormLabel>
            <Input
              placeholder="Channel name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Channel Description</FormLabel>
            <Input
              placeholder="Channel description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <HStack spacing="20px">
            <Button onClick={onClose}>Close</Button>
            <SpinnerButton
              loading={loading}
              onClick={onEdit}
              colorScheme="blue"
              mr={3}
            >
              Add Channel
            </SpinnerButton>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
