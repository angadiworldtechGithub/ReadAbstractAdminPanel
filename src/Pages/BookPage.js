import { useState, useRef, useContext, useCallback } from "react";
import { HStack } from "@chakra-ui/react";

import { Checkbox, Textarea } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { FILE_HEADERS } from "../utilities";
import axios from "axios";
import { DataContext } from "../Context/DataContext";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const BOOK_TEMPLATE = {
  is: true,
  summary: "",
  quick: "",
  conclusion: "",
  feature: "",
};

export default function BookPage() {
  const { channels, authors, setBooks } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [channelId, setChannelId] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [minutes, setMinutes] = useState("");
  const [author, setAuthor] = useState({
    id: "",
    name: "",
  });
  const [booktype, setBookType] = useState("Article");
  const [type, setType] = useState("premium");
  const [rating, setRating] = useState("10");
  const [english, setEnglish] = useState(BOOK_TEMPLATE);
  const [hindi, setHindi] = useState(BOOK_TEMPLATE);
  const [kannada, setKannada] = useState(BOOK_TEMPLATE);

  const onAdd = useCallback(async () => {
    if (
      fileRef.current.files.length &&
      title !== "" &&
      year !== "" &&
      minutes !== "" &&
      channelId !== "" &&
      author.id !== ""
    ) {
      setLoading(true);
      const {
        data: { book },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/book`,
        {
          bookimage: fileRef.current.files[0],
          title,
          year,
          minutes,
          authorid: author.split(":")[0],
          authorname: author.split(":")[1],
          booktype,
          type,
          rating,
          english: english.is,
          feature: english.feature,
          quick: english.quick,
          summary: english.summary,
          conclusion: english.conclusion,
          hindi: hindi.is,
          hindifeature: hindi.feature,
          hindiquick: hindi.quick,
          hindisummary: hindi.summary,
          hindiconclusion: hindi.conclusion,
          kannada: kannada.is,
          kannadafeature: kannada.feature,
          kannadaquick: kannada.quick,
          kannadasummary: kannada.summary,
          kannadaconclusion: kannada.conclusion,
          channelid: channelId,
        },
        {
          headers: FILE_HEADERS(token),
        }
      );
      setBooks((books) => [...books.concat([{ ...book }])]);
      setLoading(false);
      navigate("/books");
    }
  }, [
    author,
    booktype,
    channelId,
    english.conclusion,
    english.feature,
    english.is,
    english.quick,
    english.summary,
    hindi.conclusion,
    hindi.feature,
    hindi.is,
    hindi.quick,
    hindi.summary,
    kannada.conclusion,
    kannada.feature,
    kannada.is,
    kannada.quick,
    kannada.summary,
    minutes,
    navigate,
    rating,
    setBooks,
    title,
    token,
    type,
    year,
  ]);

  return (
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
                setChannelId(e.target.value);
              }}
            >
              {channels.map((channel) => (
                <option key={channel._id} value={channel._id}>
                  {channel.channel}
                </option>
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
                <FormLabel w="250px">
                  Select Author or (<Link to="/author">Add Author</Link>)
                </FormLabel>
                <Select
                  placeholder="Select Author"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                >
                  {authors.map((author) => (
                    <option
                      key={author._id}
                      value={`${author._id}:${author.authorname}`}
                    >
                      {author.authorname}
                    </option>
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
                <option value="article">Article</option>
                <option value="podcast">Podcast</option>
                <option value="book">Book</option>
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
                {["0", "1", "2", "3", "4", "5"].map((num) => (
                  <option value={num}>{num}</option>
                ))}
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
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </Select>
              </FormControl>
            </Box>
          </HStack>

          <Box paddingLeft="2px" paddingTop="90px" paddingBottom="35px">
            <Box>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <Checkbox
                    checked={english.is}
                    onChange={(e) => {
                      setEnglish((english) => ({
                        ...english,
                        is: e.target.checked,
                      }));
                    }}
                  >
                    English
                  </Checkbox>
                </li>
                <Stack spacing={3}>
                  <Input
                    type="text"
                    placeholder="Feature"
                    value={english.feature}
                    onChange={(e) => {
                      setEnglish((english) => ({
                        ...english,
                        feature: e.target.value,
                      }));
                    }}
                  />
                  <Textarea
                    style={{ height: "100px" }}
                    type="text"
                    placeholder="Quick"
                    value={english.quick}
                    onChange={(e) => {
                      setEnglish((english) => ({
                        ...english,
                        quick: e.target.value,
                      }));
                    }}
                  />
                  <Textarea
                    style={{ height: "200px" }}
                    type="text"
                    placeholder="Summary"
                    value={english.summary}
                    onChange={(e) => {
                      setEnglish((english) => ({
                        ...english,
                        summary: e.target.value,
                      }));
                    }}
                  />
                  <Textarea
                    style={{ height: "100px" }}
                    type="text"
                    placeholder="Conclusion"
                    value={english.conclusion}
                    onChange={(e) => {
                      setEnglish((english) => ({
                        ...english,
                        conclusion: e.target.value,
                      }));
                    }}
                  />
                </Stack>
                <li>
                  <Checkbox
                    style={{ marginTop: "30px" }}
                    value={kannada.is}
                    onChange={(e) => {
                      setKannada((kannada) => ({
                        ...kannada,
                        is: e.target.checked,
                      }));
                    }}
                  >
                    Kannada
                  </Checkbox>
                </li>
                <Stack spacing={3}>
                  <Input
                    type="text"
                    placeholder="Feature"
                    value={kannada.feature}
                    onChange={(e) => {
                      setKannada((kannada) => ({
                        ...kannada,
                        feature: e.target.value,
                      }));
                    }}
                  />
                  <Textarea
                    style={{ height: "100px" }}
                    type="text"
                    placeholder="Quick"
                    value={kannada.quick}
                    onChange={(e) => {
                      setKannada((kannada) => ({
                        ...kannada,
                        quick: e.target.value,
                      }));
                    }}
                  />
                  <Textarea
                    style={{ height: "200px" }}
                    type="text"
                    placeholder="Summary"
                    value={kannada.summary}
                    onChange={(e) => {
                      setKannada((kannada) => ({
                        ...kannada,
                        summary: e.target.value,
                      }));
                    }}
                  />
                  <Textarea
                    style={{ height: "100px" }}
                    type="text"
                    placeholder="Conclusion"
                    value={kannada.conclusion}
                    onChange={(e) => {
                      setKannada((kannada) => ({
                        ...kannada,
                        conclusion: e.target.value,
                      }));
                    }}
                  />
                </Stack>
                <li>
                  <Checkbox
                    style={{ marginTop: "30px" }}
                    checked={hindi.is}
                    onChange={(e) => {
                      setHindi((hindi) => ({
                        ...hindi,
                        is: e.target.checked,
                      }));
                    }}
                  >
                    Hindi
                  </Checkbox>
                </li>
                <Stack spacing={3}>
                  <Input
                    type="text"
                    placeholder="Feature"
                    value={hindi.feature}
                    onChange={(e) => {
                      setHindi((hindi) => ({
                        ...hindi,
                        feature: e.target.value,
                      }));
                    }}
                  />
                  <Textarea
                    style={{ height: "100px" }}
                    type="text"
                    placeholder="Quick"
                    value={hindi.quick}
                    onChange={(e) => {
                      setHindi((hindi) => ({
                        ...hindi,
                        quick: e.target.value,
                      }));
                    }}
                  />
                  <Textarea
                    style={{ height: "200px" }}
                    type="text"
                    placeholder="Summary"
                    value={hindi.summary}
                    onChange={(e) => {
                      setHindi((hindi) => ({
                        ...hindi,
                        summary: e.target.value,
                      }));
                    }}
                  />
                  <Textarea
                    style={{ height: "100px" }}
                    type="text"
                    placeholder="Conclusion"
                    value={hindi.conclusion}
                    onChange={(e) => {
                      setHindi((hindi) => ({
                        ...hindi,
                        conclusion: e.target.value,
                      }));
                    }}
                  />
                </Stack>
              </ul>
            </Box>
          </Box>
          <Button colorScheme="green" onClick={onAdd}>
            {loading ? <Spinner /> : "Add Book"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
