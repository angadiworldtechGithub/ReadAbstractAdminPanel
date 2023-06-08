import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box background="#1D1D1D" color="white" minW="240px">
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
                <Link to="/slider">Slider</Link>
              </Box>
            </AccordionButton>
          </h2>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Channels
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} background="#2D2D2D">
            <Link to="/channels">Channel</Link>
          </AccordionPanel>
          <AccordionPanel pb={4} background="#2D2D2D">
            <Link to="/author">Author</Link>
          </AccordionPanel>
          <AccordionPanel pb={4} background="#2D2D2D">
            <Link to="/books">Books</Link>
          </AccordionPanel>
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
                User Data Mangement
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} background="#2D2D2D">
            <Link to="/comments">Comments Management</Link>
          </AccordionPanel>
          <AccordionPanel pb={4} background="#2D2D2D">
            <Link to="/feedback">Feedback Management</Link>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Accounting
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} background="#2D2D2D">
            <Link to="/subscription">Subscription</Link>
          </AccordionPanel>
          <AccordionPanel pb={4} background="#2D2D2D">
            <Link to="/transaction">Transaction</Link>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
