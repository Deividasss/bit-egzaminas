import React, { useState } from "react";
import axios from "axios";
import "./DonationForm.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default (props) => {
  const [donation, setDonation] = useState({
    name: "",
    comment: "",
    donation: 5,
    CrowdFunderId: props.id,
  });

  const [donationMessage, setDonationMessage] = useState({
    message: "",
    status: "",
  });

  const handleValidation = () => {
    for (let index of Object.keys(donation)) {
      if (index === "donation" && donation[index] < 1) {
        return false;
      }
      if (donation[index] === "") {
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (e) => {
    setDonation({
      ...donation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      setDonationMessage({
        message: "Donation form was filled incorrectly",
        status: "danger",
      });
      return false;
    }

    axios
      .post("/api/donations/donate", donation)
      .then((resp) => {
        setDonationMessage({
          message: resp.data.message,
          status: resp.data.status,
        });
        if (resp.data.status === "success") {
          setDonationMessage({
            message: resp.data.message,
            status: resp.data.status,
          });
        }
      })
      .catch(() => {
        setDonationMessage({ message: "Server error", status: "danger" });
      });
  };

  return (
    <div className="donationForm">
      <h2>Leave a Donation!</h2>
      {donationMessage.message && (
        <Alert variation={donationMessage.status}>
          {donationMessage.message}
        </Alert>
      )}
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your name"
            value={donation.name}
            onChange={handleInputChange}
            maxLength="20"
          />
          <input
            type="number"
            name="donation"
            className="form-control"
            placeholder="Amount"
            value={donation.donation}
            onChange={handleInputChange}
            minLength="1"
            maxLength="4"
            size="4"
          ></input>
          <div className="dollarSign">$</div>
          <textarea
            name="comment"
            rows="3"
            className="form-control"
            placeholder="Comment (100 letters)"
            value={donation.comment}
            onChange={handleInputChange}
            maxLength="100"
          />
        </div>
        <Button type="submit" variant="primary">
          Donate
        </Button>
      </form>
    </div>
  );
};
