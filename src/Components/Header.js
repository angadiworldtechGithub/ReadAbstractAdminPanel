import { Box, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Header() {
  const { setToken, token } = useContext(AuthContext);
  return (
    <Box
      h="70px"
      background="orange"
      color="white"
      fontSize="25px"
      fontWeight="600"
      paddingLeft="80px"
      paddingTop="15px"
    >
      <Box>
        {" "}
        Read Abstract
        {token !== "" ? (
          <Button
            float="right"
            colorScheme="teal"
            marginRight="10px"
            marginBottom="10px"
            onDoubleClick={() => {
              setToken("");
            }}
          >
            Sign Out
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
