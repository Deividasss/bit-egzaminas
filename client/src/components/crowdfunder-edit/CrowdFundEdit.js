import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";


export default (CrowdFundEdit) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cfForm, setcfForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });
  const [donations, setDonations] = useState([]);

  const sum = () => {
    let total = 0;
    donations.forEach((e) => {
      total += e.donation;
    });
    return total;
  };

  useEffect(() => {
    axios
      .get("/api/crowdfunder/comments/" + id)
      .then((resp) => {
        if (resp.data.status === "success") {
          setDonations(resp.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/crowdfunder/single/" + id)
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);

        if (resp.data.status === "success") {
          setcfForm(resp.data.message);
          console.log(cfForm);
        } else {
          navigate("/mycrowdfunders");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setMessages({ message: "Server side error", status: "danger" });
      });
  }, []);

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
    if (!handleValidation()) {
      setMessages({
        message: "Crowdfunder form was filled in incorrectly",
        status: "danger",
      });
      return false;
    }

    // const form = new FormData()
    // Object.entries(cfForm).map((data) => {
    //     form.append(data[0], data[1])
    // })

    axios
      .put(`/api/crowdfunder/update/${id}`, cfForm)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/mycrowdfunders");
          }, 2000);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  };


  return (
    <Container>
      {isLoading ? (
        "Loading...."
      ) : (
        <div className="crowdFundEdit">
          {messages.message && (
            <Alert variation={messages.status}>{messages.message}</Alert>
          )}
          <h1>Tvarkykite sukurt?? meistro anket??</h1>
          <div className="imageDiv">
            <img
              className="cf_image"
              src={"/uploads/" + cfForm.cf_image}
              alt="image"
            />
          </div>
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="field mb-3">
              <label className="form-label">Vardas</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your Headline"
                value={cfForm.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="field mb-3">
              <label className="form-label">Pavard??</label>
              <input
                className="form-control"
                rows="9"
                name="last_name"
                value={cfForm.last_name}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="field mb-3">
              <label className="form-label">Specializacija</label>
              <input
                className="form-control"
                rows="9"
                name="specialization"
                value={cfForm.specialization}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="field mb-3">
              <label className="form-label">Serviso pavadinimas</label>
              <input
                className="form-control"
                rows="9"
                name="servise_name"
                value={cfForm.servise_name}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="field mb-3">
              <label className="form-label">Miestas</label>
              <input
                className="form-control"
                rows="9"
                name="city"
                value={cfForm.city}
                onChange={handleInputChange}
              ></input>
            </div>
            <Button type="submit" className="item ui button">
              I??saugoti pakeitimus
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
};
