import { createContext, useState, useEffect } from "react";
import { HEADERS } from "./constants";
import axios from "axios";

// push all use effect hooks here

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [data, setData] = useState({
    books: [],
    authors: [],
    users: [],
    channels: [],
  });

  useEffect(() => {
    (async () => {
      const { data: data_ } = await axios.get(
        `${process.env.REACT_APP_API_URL}/alluser`,
        {
          headers: HEADERS,
        }
      );
      setData({ ...data, users: data_.user });
    })();
  }, []);
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
