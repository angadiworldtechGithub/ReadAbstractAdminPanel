import { useContext, useMemo } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { Button, Input, Box } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { DataContext } from "../Context/DataContext";
import { CSVLink } from "react-csv";
import shortid from "shortid";

const TRANSACTION_HEADERS = [
  "User Id",
  "Subscription Id",
  "Transaction Id",
  "Placed On",
  "Status",
];
const TRANSACTION_KEYS = [
  "userid",
  "packageid",
  "transactionid",
  "date",
  "status",
];

function Transaction() {
  const { transactions } = useContext(DataContext);

  const csvData = useMemo(() => {
    const data = [TRANSACTION_HEADERS];
    transactions.forEach((transaction) => {
      data.push(TRANSACTION_KEYS.map((key) => transaction[key]));
    });
    return data;
  }, [transactions]);

  return (
    <>
      <Box padding="20px 20px 20px 20px" fontSize="30px" fontWeight="600">
        Transaction Details
      </Box>

      <Box paddingLeft="20px" paddingTop="10px" paddingBottom="35px">
        <HStack spacing="100px">
          <Box w="70px" h="10" bg="white" paddingTop="25px">
            <Button color="green" bg="white" border="2px Solid green">
              <CSVLink
                data={csvData}
                filename={`transactions_${shortid.generate()}.csv`}
              >
                Export to CSV
              </CSVLink>
            </Button>
          </Box>
          <Box w="170px" h="15" bg="white" paddingBottom="35px">
            <Text>Search this table</Text>
            <Input w="250px" border="3px Solid skyblue" placeholder="Search" />
          </Box>
          <Box w="180px" h="10" bg="white" paddingTop="25px">
            <Button color="skyblue" bg="white" border="2px Solid skyblue">
              Clear
            </Button>
          </Box>
        </HStack>
      </Box>

      <Box maxWidth="100wv" padding="20px 20px 20px 20px">
        <TableContainer border="2px solid black">
          <Table variant="simple">
            <Thead>
              <Tr borderBottom="2px solid black">
                <Th>User Id</Th>
                <Th>Subscription Id</Th>
                <Th>Transaction Id</Th>
                <Th>Placed On</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => {
                return (
                  <Tr>
                    <Td>{transaction.userid}</Td>
                    <Td>{transaction.packageid}</Td>
                    <Td>{transaction.transactionid ?? "---------"}</Td>
                    <Td>{transaction.date}</Td>
                    <Td>{transaction.status}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Transaction;
