import React from "react";
import { Box } from "@chakra-ui/react";
import { Grid, GridItem, HStack } from "@chakra-ui/react";

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
  return (
    <div>
      <Box
        paddingLeft="80px"
        paddingTop="20px"
        fontSize="30px"
        fontWeight="500"
      >
        DashBoard
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
              <h1>15</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Sub-Channel
              <h1>14</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Books
              <h1>1294</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Authors
              <h1>10</h1>
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
              <h1>139</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total free Users
              <h1>7</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Subscribed Users
              <h1>40</h1>
            </StyledGridItem>
          </HStack>
        </Box>
      </Grid>
    </div>
  );
}

export default Dashboard;
