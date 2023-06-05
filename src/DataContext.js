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
    transactions: [],
    subscriptions: [],
  });

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/alluser`, {
        headers: HEADERS,
      });
      setData({ ...data, users: user });

      const {
        data: { transaction },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/gettransactions`, {
        headers: HEADERS,
      });
      setData({ ...data, transactions: transaction });

      const {
        data: { payment },
      } = await axios.get(
        `${process.env.REACT_APP_API_URL}/getallsubscription`,
        {
          headers: HEADERS,
        }
      );
      setData({
        ...data,
        transactions: transaction,
        subscriptions: payment,
        users: user,
      });
    })();
  }, []);
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
