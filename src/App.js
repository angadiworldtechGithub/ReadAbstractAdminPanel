import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Accounting from "./Pages/Accounting";
import Channels from "./Pages/Channels";
import Author from "./Pages/Author";
import Books from "./Pages/Books";
import UserManagement from "./Pages/UserManagement";
import Subscription from "./Pages/Subscription";
import Transaction from "./Pages/Transaction";
import Comments from "./Pages/Comments";
import Notification from "./Pages/Notification";
import Slider from "./Pages/Slider";
import User from "./Pages/User";
import Login from "./Pages/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Bookpages from "./Pages/Bookpages";

// ALL URLS MUST BE IN LOWER CASE ... !!! VERY IMP

function App() {
  return (
    <ChakraProvider>
      <div>
        <BrowserRouter>
          <Sidebar>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/accounting" element={<Accounting />}></Route>
              <Route path="/channels" element={<Channels />}></Route>
              <Route path="/books" element={<Books />}></Route>
              <Route path="/author" element={<Author />}></Route>
              <Route path="/subscription" element={<Subscription />}></Route>
              <Route path="/transaction" element={<Transaction />}></Route>
              <Route path="/comments" element={<Comments />}></Route>
              <Route
                path="/usermanagement"
                element={<UserManagement />}
              ></Route>
              <Route path="/comments" element={<Comments />}></Route>
              <Route path="/notification" element={<Notification />}></Route>
              <Route path="/slider" element={<Slider />}></Route>
              <Route path="/user" element={<User />}></Route>
              <Route path="/bookpages" element={<Bookpages />}></Route>
            </Routes>
          </Sidebar>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
