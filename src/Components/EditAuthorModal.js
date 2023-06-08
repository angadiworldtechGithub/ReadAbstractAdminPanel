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
import SpinnerButton from "./SpinnerButton";
import { FILE_HEADERS } from "../utilities";
import { AuthContext } from "../Context/AuthContext";

export default function EditAuthorModal({
  isOpen,
  onClose,
  authorId,
  authorData,
}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const { setAuthors } = useContext(DataContext);
  const { token } = useContext(AuthContext);

  useMemo(() => {
    setName(authorData.authorname);
    setAbout(authorData.aboutauthor);
  }, [isOpen]);

  const onEdit = async () => {
    if (name !== "" && about !== "") {
      setLoading(true);
      const {
        data: { author },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/editauthor/${authorId}`,
        {
          authorimage: initialRef.current.files[0],
          authorname: name,
          aboutauthor: about,
        },
        {
          headers: FILE_HEADERS(token),
        }
      );
      setAuthors((authors) => {
        const index = authors.findIndex((author_) => author_.id === authorId);
        authors[index] = { ...author };
        return [...authors];
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
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>About Author</FormLabel>
            <Input
              placeholder="About Author"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <HStack spacing="20px">
            <Button colorScheme="green" onClick={onClose}>
              Close
            </Button>
            <SpinnerButton
              loading={loading}
              colorScheme="red"
              mr={3}
              onClick={onEdit}
            >
              Edit Author
            </SpinnerButton>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
