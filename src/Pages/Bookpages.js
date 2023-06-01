import React from 'react'
import { HStack, Text } from "@chakra-ui/react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
  } from "@chakra-ui/react";

function Bookpages() {
  return (
    <div>
    <Box padding="20px 20px 20px 20px">
    <FormControl isRequired>
     <FormLabel w="1000px">Book Image</FormLabel>
     <Input type="file" placeholder="No file chosen" required />
    </FormControl>


    <Box paddingLeft="2px" paddingTop="10px" paddingBottom="35px">
    
    <HStack spacing="20px">
      <Box w="350px" h="10" bg="white" paddingTop="25px">
      <FormLabel w="1000px">Select Channel</FormLabel>
      <Input type="text" placeholder="Select Channel" />
      </Box>
      <Box w="350px" h="10" bg="white" paddingTop="25px">
      <FormLabel w="1000px">Select Sub-Channel</FormLabel>
        <Input type="text" placeholder="Select Sub-Channel" />
      </Box>
     
      <Box w="350px" h="10" bg="white" paddingTop="25px">
      <FormControl  isRequired>
      <FormLabel w="1000px">Title</FormLabel>
         <Input type="text" placeholder="Title" />
      </FormControl>
      </Box>
    
    </HStack>
   

  </Box>

 
   </Box>
    </div>
  );
}

export default Bookpages