import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Sidebar({ children }) {
  return (
    <>
      <Box h="70px" background="orange" color="white" fontSize="25px" paddingLeft="80px" paddingTop="15px">
         <Box> Read Abstract </Box>
      </Box>
      <Flex>
        <Box background="#1D1D1D" color="white" w="240px">
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Link to="/dashboard">Dashboard</Link>
                  </Box>
                </AccordionButton>
              </h2>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Link to="/slider" >Slider</Link>
                  </Box>
                </AccordionButton>
              </h2>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Link to="/channels">Channels</Link>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} background="#2D2D2D"><Link to="/channels">Channel</Link></AccordionPanel>
              <AccordionPanel pb={4} background="#2D2D2D"><Link to="/author">Author</Link></AccordionPanel>
              <AccordionPanel pb={4} background="#2D2D2D"><Link to="/books">Books</Link></AccordionPanel>
            </AccordionItem>

            
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Link to="/user">User</Link>
                  </Box>
                </AccordionButton>
              </h2>
            </AccordionItem>

            
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Link to="/notification">Notification</Link>
                  </Box>
                </AccordionButton>
              </h2>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Link to="/feedback">Feedback Mangement</Link>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} background="#2D2D2D"><Link to="/comments">Comments Management</Link></AccordionPanel>
              <AccordionPanel pb={4} background="#2D2D2D"><Link to="/usermanagement">User Feedback Management</Link></AccordionPanel>
            </AccordionItem>

            <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Link to="/Accounting">Accounting</Link>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} background="#2D2D2D"><Link to="/subscription">Subscription</Link></AccordionPanel>
            <AccordionPanel pb={4} background="#2D2D2D"><Link to="/transaction">Transaction</Link></AccordionPanel>
          </AccordionItem>

          </Accordion>
        </Box>

        <Box minH="1000px">{children}</Box>
      </Flex>
    </>
  );
}
