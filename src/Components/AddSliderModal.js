import { useRef, useState } from "react";
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
import { FILE_HEADERS } from "../constants";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function AddSliderModal({ isOpen, onClose, setSliders }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const onSave = async () => {
    if (initialRef.current.files.length) {
      setLoading(true);
      console.log(initialRef.current.files[0]);
      const {
        data: { slider },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/addslider`,
        {
          slider: initialRef.current.files[0],
        },
        {
          headers: FILE_HEADERS(token),
        }
      );
      setSliders((sliders) => [...sliders.concat([{ slider: slider.slider }])]);
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
        <ModalHeader>Slider</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Add the Slider Image</FormLabel>
            <Input ref={initialRef} type="file" placeholder="No file chosen" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <HStack spacing="20px">
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" mr={3} onClick={onSave}>
              {loading ? <Spinner /> : "Save"}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
