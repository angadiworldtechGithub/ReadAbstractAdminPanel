import { useRef, useState, useContext } from "react";
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
  HStack,
  Input,
} from "@chakra-ui/react";
import { HEADERS } from "../constants";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";

export default function AddNotificationModal({
  isOpen,
  onClose,
  setNotifications,
}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const onAdd = async () => {
    if (text !== "") {
      setLoading(true);
      const {
        data: { notification },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/postnotification`,
        {
          text,
        },
        {
          headers: HEADERS(token),
        }
      );
      setNotifications((notifications) => [
        ...notifications.concat([{ ...notification }]),
      ]);
      onClose();
      setText("");
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
        <ModalHeader>Notification</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Notification</FormLabel>
            <Input
              type="text"
              placeholder="Enter Notification"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <HStack spacing="20px">
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" mr={3} onClick={onAdd}>
              {loading ? <Spinner /> : "Save"}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
