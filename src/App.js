import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import Channels from "./Pages/Channels";
import Author from "./Pages/Author";
import Books from "./Pages/Books";
import Feedback from "./Pages/Feedback";
import Subscription from "./Pages/Subscription";
import Transaction from "./Pages/Transaction";
import Comments from "./Pages/Comments";
import Notification from "./Pages/Notification";
import Slider from "./Pages/Slider";
import User from "./Pages/User";
import Login from "./Pages/Login";
import { ChakraProvider } from "@chakra-ui/react";
import BookPage from "./Pages/BookPage";
import Pagination from "./Components/Pagination";
import { DataContextProvider } from "./Context/DataContext";
import Protect from "./Protect";
import { AuthContextProvider } from "./Context/AuthContext";

// ALL URLS MUST BE IN LOWER CASE ... !!! VERY IMP

function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <DataContextProvider>
          <BrowserRouter>
            <Protect>
              <Layout>
                <Routes>
                  <Route path="/" element={<Login />}></Route>
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route path="/channels" element={<Channels />}></Route>
                  <Route path="/books" element={<Books />}></Route>
                  <Route path="/author" element={<Author />}></Route>
                  <Route
                    path="/subscription"
                    element={<Subscription />}
                  ></Route>
                  <Route path="/transaction" element={<Transaction />}></Route>
                  <Route path="/comments" element={<Comments />}></Route>
                  <Route path="/pagination" element={<Pagination />}></Route>
                  <Route path="/feedback" element={<Feedback />}></Route>
                  <Route path="/comments" element={<Comments />}></Route>
                  <Route
                    path="/notification"
                    element={<Notification />}
                  ></Route>
                  <Route path="/slider" element={<Slider />}></Route>
                  <Route path="/user" element={<User />}></Route>
                  <Route path="/bookpages" element={<BookPage />}></Route>
                </Routes>
              </Layout>
            </Protect>
          </BrowserRouter>
        </DataContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
