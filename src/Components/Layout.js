import { Flex, Box, Center } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Header from "./Header";

export default function Layout({ children }) {
  const { token } = useContext(AuthContext);
  return (
    <>
      <Header />
      <Flex>
        {token !== "" ? <Sidebar /> : <></>}
        <Box minH="500px">{children}</Box>
      </Flex>
      <Box
        h="50px"
        background="#1D1D1D"
        color="white"
        fontSize="15px"
        fontWeight="600"
      >
        <Box marginLeft="40%" paddingTop="13px">
          Develop &amp; Design AWT © Copyright
        </Box>
      </Box>
    </>
  );
}
