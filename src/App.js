import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Accounting from "./Pages/Accounting";
import Channels from "./Pages/Channels";
import Author from "./Pages/Author";
import Books from "./Pages/Books";
import Usermanagement from "./Pages/Usermanagement";
import Subscription from "./Pages/Subscription";
import Transaction from "./Pages/Transaction";
import Comments from "./Pages/Comments";
import Notification from "./Pages/Notification";
import Slider from "./Pages/Slider";
import User from "./Pages/User";
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
              <Route path="/Dashboard" element={<Dashboard />}></Route>
              <Route path="/Accounting" element={<Accounting />}></Route>
              <Route path="/Channels" element={<Channels />}></Route>
              <Route path="/Books" element={<Books />}></Route>
              <Route path="/Author" element={<Author />}></Route>
              <Route path="/Subscription" element={<Subscription />}></Route>
              <Route path="/Transaction" element={<Transaction />}></Route>
              <Route path="/Comments" element={<Comments />}></Route>
              <Route
                path="/Usermanagement"
                element={<Usermanagement />}
              ></Route>
              <Route path="/Comments" element={<Comments />}></Route>
              <Route path="/Notification" element={<Notification />}></Route>
              <Route Path="/Slider" element={<Slider />}></Route>
              <Route path="/User" element={<User />}></Route>
              <Route path="/bookpages" element={<Bookpages />}></Route>
            </Routes>
          </Sidebar>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
