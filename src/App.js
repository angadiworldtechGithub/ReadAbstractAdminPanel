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
import Sub from "./Pages/Sub";
import Transaction from "./Pages/Transaction";
import Comments from "./Pages/Comments";
import Notification from "./Pages/Notification";
import Slider from "./Pages/Slider";
import User from "./Pages/User";
import { ChakraProvider } from "@chakra-ui/react";
import Bookpages from "./Pages/Bookpages";

function App() {
  return (
    <ChakraProvider>
      <div>
        <BrowserRouter>
          <Sidebar>
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/accounting" element={<Accounting />}></Route>
              <Route path="/channels" element={<Channels />}></Route>
              <Route path="/books" element={<Books />}></Route>
              <Route path="/author" element={<Author />}></Route>
              <Route path="/sub" element={<Sub />}></Route>
              <Route path="/transaction" element={<Transaction />}></Route>
              <Route path="/comments" element={<Comments />}></Route>
              <Route
                path="/usermanagement"
                element={<Usermanagement />}
              ></Route>
              <Route path="/notification" element={<Notification />}></Route>
              <Route path="/Slider" element={<Slider />}></Route>
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
