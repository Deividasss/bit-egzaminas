import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/header/Header";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import Homepage from "./components/Homepage/Homepage.js";
import "bootstrap/dist/css/bootstrap.min.css";
import CrowdFundCreate from "./components/crowdfunder-create/CrowdFundCreate.js";
import MyFundraisers from "./components/myFundraisers/MyFundraisers";

export default () => {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [userRole, setUserRole] = useState(0);
  const [email, setEmail] = useState("");
  const [UserId, setUserId] = useState(0);

  useEffect(() => {
    axios.get("/checkAuth", { withCredentials: true }).then((resp) => {
      console.log(resp);
      if (resp.data.id) {
        setIsloggedIn(true);
        setUserRole(resp.data.role);
        setEmail(resp.data.email);
        setUserId(resp.data.id);
      }
    });
  }, []);

  const handleLoginState = (
    loggedIn,
    role = false,
    email = false,
    UserId = false
  ) => {
    setIsloggedIn(loggedIn);
    setUserRole(role);
    setEmail(email);
    setUserId(UserId);
  };

  return (
    <div className="App">
      <Router>
        <Header
          loggedIn={isLoggedIn}
          userRole={userRole}
          email={email}
          handleLoginState={handleLoginState}
        />
        <Routes>
          {!isLoggedIn && (
            <Route path="/registration" element={<Registration />} />
          )}
          {!isLoggedIn && (
            <Route path="/login" element={<Login state={handleLoginState} />} />
          )}
          <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} />} />
          {isLoggedIn && (
            <Route
              path="/createCrowdFounding"
              element={<CrowdFundCreate UserId={UserId} />}
            />
          )}
          {isLoggedIn && (
            <Route
              path="/mycrowdfunders"
              element={<MyFundraisers UserId={UserId} />}
            />
          )}
        </Routes>
      </Router>
    </div>
  );
};
