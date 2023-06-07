import { useState, useRef, useContext } from "react";
import { HStack } from "@chakra-ui/react";

import { Checkbox } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Spinner } from "react";
import { FILE_HEADERS } from "../constants";
import axios from "axios";
import { DataContext } from "../DataContext";
import { useNavigate } from "react-router-dom";

const BOOK_TEMPLATE = {
  is: true,
  summary: "",
  quick: "",
  conclusion: "",
};

export default function BookPage() {
  const { channels, authors, setBooks } = useContext(DataContext);
  const navigate = useNavigate();

  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [channelId, setChannelId] = useState(channels[0]._id);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [minutes, setMinutes] = useState("");
  const [author, setAuthor] = useState({
    id: authors[0]._id,
    name: authors[0].authorname,
  });
  const [booktype, setBookType] = useState("Article");
  const [type, setType] = useState("Premium");
  const [rating, setRating] = useState("");
  const [english, setEnglish] = useState(BOOK_TEMPLATE);
  const [hindi, setHindi] = useState(BOOK_TEMPLATE);
  const [kannada, setKannada] = useState(BOOK_TEMPLATE);

  const onAdd = async () => {
    if (
      fileRef.current.files.length &&
      title !== "" &&
      year !== "" &&
      minutes !== ""
    ) {
      setLoading(true);
      const {
        data: { author },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/postauthor`,
        {
          bookimage: fileRef.current.files[0],
          title,
          year,
        },
        {
          headers: FILE_HEADERS,
        }
      );
      setBooks((authors) => [...authors.concat([{ ...author }])]);
      setLoading(false);
      navigate("/books");
    }
  };
  return (
    <div>
      <Box padding="20px 20px 20px 20px">
        <FormControl isRequired>
          <FormLabel w="200px">Book Image</FormLabel>
          <Input
            type="file"
            placeholder="No file chosen"
            required
            ref={fileRef}
          />
        </FormControl>

        <Box paddingLeft="2px" paddingTop="10px" paddingBottom="35px">
          <HStack spacing="20px">
            <Box w="350px" h="10" bg="white" paddingTop="25px">
              <FormLabel w="200px">Select Channel</FormLabel>
              <Select
                placeholder="Select Channel"
                value={channelId}
                onChange={(e) => {
                  console.log(e.target);
                  setChannelId({ id: e.target.value });
                }}
              >
                {channels.map((channel) => (
                  <option value={channel._id}>{channel.channel}</option>
                ))}
              </Select>
            </Box>
            <Box w="350px" h="10" bg="white" paddingTop="25px">
              <FormControl isRequired>
                <FormLabel w="200px">Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
          </HStack>

          <Box paddingLeft="2px" paddingTop="50px" paddingBottom="35px">
            <HStack spacing="20px">
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormLabel w="200px">Year</FormLabel>
                <Input
                  type="text"
                  placeholder="Year"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </Box>
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormControl isRequired>
                  <FormLabel w="200px">Select Author</FormLabel>
                  <Select
                    placeholder="Select Author"
                    value={author.id}
                    onChange={(e) => {
                      setAuthor({ id: e.target.value, name: e.target.text });
                    }}
                  >
                    {authors.map((author) => (
                      <option value={author._id}>{author.authorname}</option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormLabel w="200px">Read Time in Minutes</FormLabel>
                <Input
                  type="text"
                  placeholder="Read Time in Minutes"
                  value={minutes}
                  onChange={(e) => {
                    setMinutes(e.target.value);
                  }}
                />
              </Box>
            </HStack>
          </Box>

          <Box paddingLeft="2px" paddingTop="20px" paddingBottom="35px">
            <HStack spacing="20px">
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormLabel w="200px">Type</FormLabel>
                <Select
                  placeholder="Type"
                  value={booktype}
                  onChange={(e) => {
                    setBookType(e.target.value);
                  }}
                >
                  <option>Article</option>
                  <option>Podcast</option>
                  <option>Book</option>
                </Select>
              </Box>
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormLabel w="200px">Select rating</FormLabel>
                <Select
                  placeholder="Select Rating"
                  value={rating}
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Select>
              </Box>
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormControl isRequired>
                  <FormLabel w="200px">Premium Type</FormLabel>
                  <Select
                    placeholder="Premium Type"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    <option>Free</option>
                    <option>Premium</option>
                  </Select>
                </FormControl>
              </Box>
            </HStack>

            <Box paddingLeft="2px" paddingTop="90px" paddingBottom="35px">
              <Box>
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    <Checkbox defaultChecked>English</Checkbox>
                  </li>
                  <Stack spacing={3}>
                    <Input type="text" H="100%" placeholder="Quick" />
                    <Input type="text" H="100%" placeholder="Summary" />
                    <Input type="text" H="100%" placeholder="Conclusion" />
                  </Stack>
                  <li>
                    <Checkbox defaultChecked>Kannada</Checkbox>
                  </li>
                  <Stack spacing={3}>
                    <Input type="text" H="100%" placeholder="Quick" />
                    <Input type="text" H="100%" placeholder="Summary" />
                    <Input type="text" H="100%" placeholder="Conclusion" />
                  </Stack>
                  <li>
                    <Checkbox defaultChecked>Hindi</Checkbox>
                  </li>
                  <Stack spacing={3}>
                    <Input type="text" H="100%" placeholder="Quick" />
                    <Input type="text" H="100%" placeholder="Summary" />
                    <Input type="text" H="100%" placeholder="Conclusion" />
                  </Stack>
                </ul>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button colorScheme="green" onClick={onAdd}>
          {loading ? <Spinner /> : "Add Book"}
        </Button>
      </Box>
    </div>
  );
}
