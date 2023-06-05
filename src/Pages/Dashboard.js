import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HEADERS } from "../constants";

const StyledGridItem = ({ children }) => {
  return (
    <GridItem
      w="240px"
      h="40"
      bg="white"
      fontSize="20px"
      fontWeight="500"
      textAlign="center"
      backgroundClip="borderbox"
      border="10px Solid #A09E9E"
      borderRadius="5px"
      paddingTop="20px"
    >
      {children}
    </GridItem>
  );
};

function Dashboard() {
  const [data, setData] = useState({
    channelCount: 0,
    bookCount: 0,
    authorCount: 0,
    userCount: 0,
    freeUserCount: 0,
    subscribedUserCount: 0,
  });

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/adminfunction/dashboard`,
        {
          headers: HEADERS,
        }
      );
      setData({
        channelCount: data.channelCount,
        bookCount: data.bookCount,
        authorCount: data.authorCount,
        userCount: data.userCount,
        freeUserCount: data.userCount - data.transactionCount,
        subscribedUserCount: data.transactionCount,
      });
    })();
  }, []);

  return (
    <div>
      <Box
        paddingLeft="80px"
        paddingTop="20px"
        fontSize="30px"
        fontWeight="500"
      >
        <Link to="/">DashBoard</Link>
      </Box>

      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={10}
        paddingLeft="80px"
        paddingTop="60px"
        paddingRight="60px"
      >
        <Box>
          <HStack spacing="20px">
            <StyledGridItem>
              Total Channels
              <h1>{data.channelCount}</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Books
              <h1>{data.bookCount}</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Authors
              <h1>{data.authorCount}</h1>
            </StyledGridItem>
          </HStack>
        </Box>
      </Grid>

      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={10}
        paddingLeft="80px"
        paddingTop="60px"
        paddingRight="60px"
      >
        <Box>
          <HStack spacing="30px">
            <StyledGridItem>
              Total Users
              <h1>{data.userCount}</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Free Users
              <h1>{data.freeUserCount}</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Subscribed Users
              <h1>{data.subscribedUserCount}</h1>
            </StyledGridItem>
          </HStack>
        </Box>
      </Grid>
    </div>
  );
}

export default Dashboard;
