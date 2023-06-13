import { useContext, useState } from "react";
import { HStack, Spinner } from "@chakra-ui/react";
import {
  useDisclosure,
  Button,
  Center,
  Box,
  Table,
  Tr,
  Thead,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { TableContainer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AddSliderModal from "../Components/AddSliderModal";
import { DataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import DeleteSliderModal from "../Components/DeleteSliderModal";
import { HEADERS } from "../utilities";
import axios from "axios";

function Slider() {
  const { sliders, setSliders } = useContext(DataContext);
  const { token } = useContext(AuthContext);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const [deleteId, setDeleteId] = useState("");

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen_,
    onClose: onDeleteClose_,
  } = useDisclosure();

  const onDeleteOpen = (id) => () => {
    setDeleteId(id);
    onDeleteOpen_();
  };

  const onDelete = async () => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/deleteslider/${deleteId}`,
      {},
      {
        headers: HEADERS(token),
      }
    );
    setSliders([...sliders.filter((slider) => slider._id !== deleteId)]);
    setDeleteId("");
    onDeleteClose_();
  };

  return (
    <>
      <Box paddingTop="20px" paddingLeft="20px">
        <Button colorScheme="green" onClick={onAddOpen}>
          <Link to="">Add Slider</Link>
        </Button>

        <AddSliderModal
          isOpen={isAddOpen}
          onClose={onAddClose}
          setSliders={setSliders}
        />
        <DeleteSliderModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose_}
          onDelete={onDelete}
        />
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px solid black">
          <Table variant="simple">
            <Thead>
              <Tr borderBottom="2px solid black">
                <Th>Slider Image</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!sliders.length ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                sliders.map((slider) => {
                  return (
                    <Tr key={slider._id}>
                      <Td>
                        <img
                          src={`${process.env.REACT_APP_URL}/slider/${slider.slider}`}
                        ></img>
                      </Td>
                      <Td>
                        <HStack spacing="20px">
                          <Button
                            colorScheme="red"
                            onClick={onDeleteOpen(slider._id)}
                          >
                            <Link to=""> Delete</Link>
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

export default Slider;
