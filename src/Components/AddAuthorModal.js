import { useRef, useState } from "react";
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
import axios from "axios";

export default function AddAuthorModal({ isOpen, onClose, setAuthors }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const onAdd = async () => {
    if (initialRef.current.files.length && name !== "" && about !== "") {
      setLoading(true);
      const {
        data: { author },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/postauthor`,
        {
          authorimage: initialRef.current.files[0],
          authorname: name,
          aboutauthor: about,
        },
        {
          headers: FILE_HEADERS,
        }
      );
      setAuthors((authors) => [...authors.concat([{ ...author }])]);
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
        <ModalHeader>Author</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Add the Author Image</FormLabel>
            <Input ref={initialRef} type="file" placeholder="No file chosen" />
          </FormControl>

          <FormControl>
            <FormLabel>Author name</FormLabel>
            <Input
              placeholder="Author name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>About Author</FormLabel>
            <Input
              placeholder="About Author"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <HStack spacing="20px">
            <Button colorScheme="green" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" mr={3} onClick={onAdd}>
              {loading ? <Spinner /> : "Save"}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
