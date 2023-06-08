import { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context/DataContext";

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
  const { dashboard } = useContext(DataContext);
  return (
    <div>
      <Box
        paddingLeft="80px"
        paddingTop="20px"
        fontSize="30px"
        fontWeight="500"
      >
        <Link to="/">Dashboard</Link>
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
              <h1>{dashboard.channelCount}</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Books
              <h1>{dashboard.bookCount}</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Authors
              <h1>{dashboard.authorCount}</h1>
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
        paddingBottom="60px"
      >
        <Box>
          <HStack spacing="20px">
            <StyledGridItem>
              Total Users
              <h1>{dashboard.userCount}</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Free Users
              <h1>{dashboard.freeUserCount}</h1>
            </StyledGridItem>

            <StyledGridItem>
              Total Subscribed Users
              <h1>{dashboard.subscribedUserCount}</h1>
            </StyledGridItem>
          </HStack>
        </Box>
      </Grid>
    </div>
  );
}

export default Dashboard;
