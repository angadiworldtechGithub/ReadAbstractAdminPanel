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
  Input,
  HStack,
  Flex,
  Square,
  Text,
  Select,
  Stack,
} from "@chakra-ui/react";

import { Spinner } from "@chakra-ui/react";
import { FILE_HEADERS } from "../constants";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../DataContext";

export default function AddSubscriptionModal({ isOpen, onClose }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("student");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [subscription_, setSubscription_] = useState("");

  const [loading, setLoading] = useState(false);
  const { setSubscriptions } = useContext(DataContext);

  const onAdd = async () => {
    if (
      initialRef.current.files.length &&
      name !== "" &&
      description !== "" &&
      subscription_ !== ""
    ) {
      setLoading(true);
      const {
        data: { subscription },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/postsubscription`,
        {
          packagename: name,
          discription: description,
          packagetype: type,
          cost,
          subscription: subscription_,
          packagephoto: initialRef.current.files[0],
        },
        {
          headers: FILE_HEADERS,
        }
      );
      setSubscriptions((subscriptions) => [
        ...subscriptions.concat([{ ...subscription }]),
      ]);
      setLoading(false);
      onClose();
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
        <ModalHeader>Package Details</ModalHeader>
        <hr></hr>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Add the Package Image</FormLabel>
            <Input ref={initialRef} type="file" placeholder="No file chosen" />
          </FormControl>

          <Stack color="black" paddingTop="2px">
            <Square w="180px" bg="white" paddingLeft="5px">
              <Text>
                <FormLabel>Package Name</FormLabel>
                <Input
                  placeholder="Package Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <FormLabel>Package Type</FormLabel>
                <Select
                  placeholder="Package Type"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="student">Students</option>
                  <option value="yourself">Yourself</option>
                  <option value="team">Team</option>
                </Select>
              </Text>
            </Square>
            <Square w="180px" bg="white" paddingLeft="5px">
              <Text>
                <FormLabel>Package Description</FormLabel>
                <Input
                  placeholder="Package Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <FormLabel>Cost Including Gst</FormLabel>
                <Input
                  placeholder="Cost Including Gst"
                  value={cost}
                  onChange={(e) => {
                    setCost(e.target.value);
                  }}
                />
                <FormLabel>Package Subscription</FormLabel>
                <Select
                  placeholder="Subscription Type"
                  value={subscription_}
                  onChange={(e) => {
                    setSubscription_(e.target.value);
                  }}
                >
                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                </Select>
              </Text>
            </Square>
          </Stack>

          <ModalFooter>
            <HStack spacing="20px">
              <Button colorScheme="red" onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" mr={1} onClick={onAdd}>
                {loading ? <Spinner /> : "Add"}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
