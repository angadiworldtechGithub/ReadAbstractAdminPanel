import { Flex, Box } from "@chakra-ui/react";
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
        h="40px"
        background="#1D1D1D"
        color="white"
        fontSize="15px"
        fontWeight="600"
        paddingTop="15px"
      >
        <Box>
          {" "}
          <center>Develop &amp; Design AWT © Copyright</center>{" "}
        </Box>
      </Box>
    </>
  );
}
