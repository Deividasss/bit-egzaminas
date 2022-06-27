import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./crowdfundcreate.css";

// const UserId = 3 //Statinsi userio ID kuri veliau keisime

export default (props) => {
  const UserId = props.UserId;
  const navigate = useNavigate();

  const [cfForm, setcfForm] = useState({
    headline: "",
    cf_image: "",
    description: "",
    cf_goal: "1000",
    approved: 0,
    success: 0,
    UserId: UserId,
  });

  const [messages, setMessages] = useState({ message: "", status: "" });

  const handleInputChange = (e) => {
    setcfForm({
      ...cfForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    for (let index of Object.keys(cfForm)) {
      if (index === "cf_goal" && cfForm[index] < 50) {
        return false;
      }
      if (cfForm[index] === "") {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cfForm);
    if (!handleValidation()) {
      setMessages({
        message: "Crowdfunder form was filled in incorrectly",
        status: "danger",
      });
      return false;
    }

    // cfForm.UserId = UserId

    const form = new FormData();
    Object.entries(cfForm).map((data) => {
      form.append(data[0], data[1]);
    });

    axios
      .post("/api/crowdfunder/create", form)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  };

  return (
    <Container>
      <div className="crowdFundCreate">
        {messages.message && (
          <Alert variation={messages.status}>{messages.message}</Alert>
        )}
        <h1>Crowdfunder creation</h1>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field mb-3">
            <label className="form-label">Headline</label>
            <input
              type="text"
              name="headline"
              className="form-control"
              placeholder="Enter your Headline"
              value={cfForm.headline}
              onChange={handleInputChange}
            />
          </div>
          <div className="field mb-3">
            <label className="form-label">Crowdfunding Image</label>
            <input
              type="file"
              name="cf_image"
              className="form-control"
              placeholder="upload your image"
              onChange={(e) =>
                setcfForm({
                  ...cfForm,
                  [e.target.name]: e.target.files[0],
                })
              }
            />
          </div>
          <div className="field mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={cfForm.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="field mb-3">
            <label className="form-label">
              Crowdfunding goal(in dollars $){" "}
            </label>
            <input
              type="number"
              name="cf_goal"
              className="form-control"
              value={cfForm.cf_goal}
              min="0"
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" variant="primary">
            Create a crowdfunder
          </Button>
        </form>
      </div>
    </Container>
  );
};
