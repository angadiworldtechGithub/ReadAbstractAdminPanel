import { createContext, useState, useEffect, useContext } from "react";
import { HEADERS } from "../utilities";
import axios from "axios";
import { AuthContext } from "./AuthContext";

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

  const { token } = useContext(AuthContext);

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
    if (token && token !== "") {
      (async () => {
        // switch to callbacks
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/adminfunction/dashboard`,
          {
            headers: HEADERS(token),
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
          headers: HEADERS(token),
        });

        setUsers(user);

        const {
          data: { transaction },
        } = await axios.get(
          `${process.env.REACT_APP_API_URL}/gettransactions`,
          {
            headers: HEADERS(token),
          }
        );

        setTransactions(transaction);

        const {
          data: { payment },
        } = await axios.get(
          `${process.env.REACT_APP_API_URL}/getallsubscription`,
          {
            headers: HEADERS(token),
          }
        );

        setSubscriptions(payment);

        const {
          data: { author },
        } = await axios.get(`${process.env.REACT_APP_API_URL}/getauthors`, {
          headers: HEADERS(token),
        });

        setAuthors(author);

        const {
          data: { channel },
        } = await axios.get(`${process.env.REACT_APP_API_URL}/getallchannel`, {
          headers: HEADERS(token),
        });
        setChannels(channel);

        const {
          data: { comment },
        } = await axios.get(`${process.env.REACT_APP_API_URL}/getcommentall`, {
          headers: HEADERS(token),
        });
        setComments(comment ?? []);

        const {
          data: { slider },
        } = await axios.get(`${process.env.REACT_APP_API_URL}/getallslider`, {
          headers: HEADERS(token),
        });
        setSliders(slider ?? []);

        const {
          data: { notification },
        } = await axios.get(`${process.env.REACT_APP_API_URL}/getnotifcation`, {
          headers: HEADERS(token),
        });
        setNotifications(notification ?? []);

        const {
          data: { feedback },
        } = await axios.get(`${process.env.REACT_APP_API_URL}/getfeedback`, {
          headers: HEADERS(token),
        });
        setFeedbacks(feedback);

        const {
          data: { book },
        } = await axios.get(`${process.env.REACT_APP_API_URL}/getallbook`, {
          headers: HEADERS(token),
        });

        setBooks(book);
      })();
    }
  }, [token]);
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
