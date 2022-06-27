import React from "react";
import { useState } from "react";
import "./Registration.css";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: 0,
  });
  const [messages, setMessages] = useState({ message: "", status: "" });

  const handleInputChange = (e) => {
    setRegisterForm({
      ...registerForm,
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

    if (registerForm.password !== registerForm.confirm_password) {
      setMessages({ message: "Password do not match", status: "danger" });
      return false;
    }

    axios
      .post("/api/users/register", registerForm)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  };

  const handleValidation = () => {
    for (let index of Object.keys(registerForm)) {
      if (registerForm[index] === "") {
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
          <h1 className="h3 mb-3 fw-normal">Sign-Up</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={registerForm.first_name}
              onChange={handleInputChange}
            />
            <label>First Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={registerForm.last_name}
              onChange={handleInputChange}
            />
            <label>Last Name</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              name="email"
              value={registerForm.email}
              onChange={handleInputChange}
            />
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password"
              value={registerForm.password}
              onChange={handleInputChange}
            />
            <label>Password</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              value={registerForm.confirm_password}
              onChange={handleInputChange}
            />
            <label>Confirm Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Register
          </button>
        </form>
      </main>
    </div>
  );
};
