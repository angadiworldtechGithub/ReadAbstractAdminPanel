import { useRef, useState } from "react";
import axios from "axios";
import { FILE_HEADERS } from "../constants";
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
import { Spinner } from "@chakra-ui/react";

export default function AddChannelModal({ isOpen, onClose, setChannels }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onAdd = async () => {
    if (initialRef.current.files.length && name !== "" && description !== "") {
      setLoading(true);
      console.log(initialRef.current.files[0]);
      const {
        data: { channel },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/postchannel`,
        {
          channelimage: initialRef.current.files[0],
          channel: name,
          channeldiscription: description,
        },
        {
          headers: FILE_HEADERS,
        }
      );
      setChannels((channels) => [...channels.concat([{ ...channel }])]);
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
        <ModalHeader paddingTop="40px">Add Channel</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Add the Channel Image</FormLabel>
            <Input ref={initialRef} type="file" placeholder="No file chosen" />
          </FormControl>

          <FormControl>
            <FormLabel>Channel name</FormLabel>
            <Input
              placeholder="Channel name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Channel description</FormLabel>
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
            <Button onClick={onAdd} colorScheme="blue" mr={3}>
              {loading ? <Spinner /> : "Save"}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
