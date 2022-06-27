import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import CfListBox from "../CfListBox/CfListBox";
import Alert from "react-bootstrap/Alert";
import "./MyFundraisers.css";
import { Link } from "react-router-dom";

export default (props) => {
  const [crowdFund, setCrowdFund] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });
  const [noCrowdfunders, setNoCrowdfunder] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/crowdfunder/user/${props.UserId}`)
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);

        if (resp.data.status === "success") {
          setCrowdFund(resp.data.message);
          console.log(resp.data.message);
        }

        if (crowdFund.length < 1) {
          setNoCrowdfunder(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setMessages({ message: "Server error", status: "danger" });
      });
  }, []);

  const List = () => {
    if (crowdFund.length < 1) {
      return (
        <div>
          <h3 style={{ color: "red" }}>No fundraisers has been created</h3>
          <Link className="item ui button primary" to="/createCrowdFounding">
            <strong>Click me to create One!</strong>
          </Link>
        </div>
      );
    } else {
      return crowdFund.map((value, index) => {
        return (
          <CfListBox
            key={index}
            setMessages={setMessages}
            crowdfunder={value}
            link="/mycrowdfunder/"
          />
        );
      });
    }
  };

  return (
    <Container>
      <h1 className="h1header">My Fundraisers</h1>
      {messages.message && (
        <Alert variation={messages.status}>{messages.message}</Alert>
      )}
      {isLoading ? (
        "Loading"
      ) : (
        <div className="row">
          <List />
        </div>
      )}
    </Container>
  );
};
