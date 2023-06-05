import React from "react";
import { HStack } from "@chakra-ui/react";

import { Checkbox } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
} from "@chakra-ui/react";

export default function BookPage() {
  return (
    <div>
      <Box padding="20px 20px 20px 20px">
        <FormControl isRequired>
          <FormLabel w="200px">Book Image</FormLabel>
          <Input type="file" placeholder="No file chosen" required />
        </FormControl>

        <Box paddingLeft="2px" paddingTop="10px" paddingBottom="35px">
          <HStack spacing="20px">
            <Box w="350px" h="10" bg="white" paddingTop="25px">
              <FormLabel w="200px">Select Channel</FormLabel>
              <Input type="text" placeholder="Select Channel" />
            </Box>
            <Box w="350px" h="10" bg="white" paddingTop="25px">
              <FormControl isRequired>
                <FormLabel w="200px">Title</FormLabel>
                <Input type="text" placeholder="Title" />
              </FormControl>
            </Box>
          </HStack>

          <Box paddingLeft="2px" paddingTop="50px" paddingBottom="35px">
            <HStack spacing="20px">
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormLabel w="200px">Publication & Year</FormLabel>
                <Input type="text" placeholder="Select Channel" />
              </Box>
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormControl isRequired>
                  <FormLabel w="200px">Select Author</FormLabel>
                  <Input type="text" placeholder="Select Sub-Channel" />
                </FormControl>
              </Box>
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormLabel w="200px">Read Time in Minutes</FormLabel>
                <Input type="text" placeholder="Read Time in Minutes" />
              </Box>
            </HStack>
          </Box>

          <Box paddingLeft="2px" paddingTop="20px" paddingBottom="35px">
            <HStack spacing="20px">
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormLabel w="200px">Type</FormLabel>
                <Select placeholder="Type">
                  <option>Article</option>
                  <option>Prodcast</option>
                  <option>Book</option>
                </Select>
              </Box>
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormLabel w="200px">Select rating</FormLabel>
                <Select placeholder="Select Rating">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Select>
              </Box>
              <Box w="350px" h="10" bg="white" paddingTop="25px">
                <FormControl isRequired>
                  <FormLabel w="200px">Premium Type</FormLabel>
                  <Select placeholder="Premium Type">
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
                    <Checkbox defaultChecked>Engilsh</Checkbox>
                  </li>
                  <Input type="text" H="100%" />
                  <li>
                    <Checkbox defaultChecked>Kannada</Checkbox>
                  </li>
                  <Input type="text" H="100%" />
                  <li>
                    <Checkbox defaultChecked>Hindi</Checkbox>
                  </li>
                  <Input type="text" H="100%" />
                </ul>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button colorScheme="green">Add Book</Button>
      </Box>
    </div>
  );
}
