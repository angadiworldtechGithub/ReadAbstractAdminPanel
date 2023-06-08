import { Text, Button, Input, Box } from "@chakra-ui/react";
import { useMemo, useState } from "react";

export default function Search({ list, setFilteredList, key_ }) {
  const [searchValue, setSearchValue] = useState("");
  useMemo(() => {
    const sv = searchValue.toLowerCase();
    if (searchValue === "") {
      setFilteredList([...list]);
    } else {
      setFilteredList([
        ...list.filter((obj) => {
          if (key_) {
            return obj[key_].toLowerCase().includes(sv);
          } else {
            return obj.toLowerCase().includes(sv);
          }
        }),
      ]);
    }
  }, [key_, list, searchValue, setFilteredList]);
  return (
    <>
      <Box w="170px" h="15" bg="white" paddingBottom="35px">
        <Text>Search this table</Text>
        <Input
          w="250px"
          border="3px Solid skyblue"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </Box>
      <Box w="180px" h="10" bg="white" paddingTop="25px">
        <Button
          color="skyblue"
          bg="white"
          border="2px solid skyblue"
          onClick={() => {
            setSearchValue("");
          }}
        >
          Clear
        </Button>
      </Box>
    </>
  );
}
