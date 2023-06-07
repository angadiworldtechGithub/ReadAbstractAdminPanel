import { createContext, useState, useEffect } from "react";
import { HEADERS } from "./constants";
import axios from "axios";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [dashboard, setDashboard] = useState({
    channelCount: 0,
    bookCount: 0,
    authorCount: 0,
    userCount: 0,
    freeUserCount: 0,
    subscribedUserCount: 0,
  });

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    (async () => {
      // switch to callbacks
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/adminfunction/dashboard`,
        {
          headers: HEADERS,
        }
      );

      setDashboard({
        channelCount: data.channelCount,
        bookCount: data.bookCount,
        authorCount: data.authorCount,
        userCount: data.userCount,
        freeUserCount: data.userCount - data.transactionCount,
        subscribedUserCount: data.transactionCount,
      });

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
        data: { feedback },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/getfeedback`, {
        headers: HEADERS,
      });
      setFeedbacks(feedback);

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
        dashboard,
        users,
        setUsers,
        transactions,
        setTransactions,
        books,
        setBooks,
        subscriptions,
        setSubscriptions,
        authors,
        setAuthors,
        channels,
        setChannels,
        comments,
        setComments,
        notifications,
        setNotifications,
        sliders,
        setSliders,
        feedbacks,
        setFeedbacks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
