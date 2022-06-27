import React from "react";
import { useState } from "react";
import "./Login.css";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [messages, setMessages] = useState({ message: "", status: "" });

  const handleInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      setMessages({
        message: "Form was filled out incorrectly",
        status: "danger",
      });
      return false;
    }

    axios
      .post("/api/users/login", loginForm)
      .then((resp) => {
        if (resp.data.status === "success") {
          setMessages({ message: "Login was successful", status: "success" });
          props.state(
            true,
            resp.data.message.role,
            resp.data.message.email,
            resp.data.message.UserId
          );
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 500);
        } else {
          setMessages({ message: resp.data.message, status: resp.data.status });
        }
      })
      .catch(() => {
        setMessages({ message: "Server side error", status: "danger" });
      });
  };

  const handleValidation = () => {
    for (let index of Object.keys(loginForm)) {
      if (loginForm[index] === "") {
        return false;
      }
    }

    return true;
  };
  return (
    <div className="text-center">
      <main className="form-signin w-100 m-auto">
        {messages.message && (
          <Alert variation={messages.status}>{messages.message}</Alert>
        )}
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Log In</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              name="email"
              value={loginForm.email}
              onChange={handleInputChange}
            />
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
            />
            <label>Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
};
