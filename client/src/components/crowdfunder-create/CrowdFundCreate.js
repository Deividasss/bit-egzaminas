import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./crowdfundcreate.css";

export default (props) => {
  const UserId = props.UserId;
  const navigate = useNavigate();

  const [cfForm, setcfForm] = useState({
    name: "",
    last_name: "",
    specialization: "",
    cf_image: "",
    servise_name: "",
    city: "",
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
        message: "Meistro pridėjimo forma užpildyta neteisingai",
        status: "danger",
      });
      return false;
    }

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
        <h1>Meistro pridėjimo forma</h1>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field mb-3">
            <label className="form-label">Vardas</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Meistro Vardas"
              value={cfForm.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="field mb-3">
            <label className="form-label">Pavardė</label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Meistro Pavardė"
              value={cfForm.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="field mb-3">
            <label className="form-label">Specializacija</label>
            <input
              type="text"
              name="specialization"
              className="form-control"
              placeholder="Meistro specializacija"
              value={cfForm.specialization}
              onChange={handleInputChange}
            />
          </div>
          <div className="field mb-3">
            <label className="form-label">Meistro Profilio Nuotrauką</label>
            <input
              type="file"
              name="cf_image"
              className="form-control"
              placeholder="Meistro Profilio Nuotrauką"
              onChange={(e) =>
                setcfForm({
                  ...cfForm,
                  [e.target.name]: e.target.files[0],
                })
              }
            />
          </div>
          <div className="field mb-3">
            <label className="form-label">Serviso pavadinimas</label>
            <input
              className="form-control"
              rows="3"
              name="servise_name"
              placeholder="Serviso pavadinimas"
              value={cfForm.servise_name}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="field mb-3">
            <label className="form-label">Miestas</label>
            <input
              type="text"
              name="city"
              className="formInput"
              placeholder="Miestas"
              value={cfForm.city}
              onChange={handleInputChange}
            />
          </div>

          <Button className="item ui button" type="submit" variant="primary">
            Pridėti Meistrą
          </Button>
        </form>
      </div>
    </Container>
  );
};
