import { createContext, useState, useEffect } from "react";
import { HEADERS } from "./constants";
import axios from "axios";

// push all use effect hooks here

export const DataContext = createContext();

// add rest of the data fetch apis here

export function DataContextProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/alluser`, {
        headers: HEADERS,
      });

      setUsers(user);

      const {
        data: { transaction },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/gettransactions`, {
        headers: HEADERS,
      });

      setTransactions(transaction);

      const {
        data: { payment },
      } = await axios.get(
        `${process.env.REACT_APP_API_URL}/getallsubscription`,
        {
          headers: HEADERS,
        }
      );

      setSubscriptions(payment);

      const {
        data: { author },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/getauthors`, {
        headers: HEADERS,
      });

      setAuthors(author);

      const {
        data: { channel },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/getallchannel`, {
        headers: HEADERS,
      });
      setChannels(channel);

      const {
        data: { comment },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/getcommentall`, {
        headers: HEADERS,
      });
      setComments(comment ?? []);

      const {
        data: { slider },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/getallslider`, {
        headers: HEADERS,
      });
      setSliders(slider ?? []);

      const {
        data: { notification },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/getnotifcation`, {
        headers: HEADERS,
      });
      setNotifications(notification ?? []);

      const {
        data: { book },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/getallbook`, {
        headers: HEADERS,
      });

      setBooks(book);
    })();
  }, []);
  return (
    <DataContext.Provider
      value={{
        users,
        transactions,
        books,
        subscriptions,
        authors,
        setAuthors,
        channels,
        setChannels,
        comments,
        notifications,
        sliders,
        setSliders,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
