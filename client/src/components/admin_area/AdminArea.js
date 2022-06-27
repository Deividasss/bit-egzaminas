import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import CfBox from "../CF-admin-box/CF-admin-box";
import Alert from "react-bootstrap/Alert";

export default () => {
  const [crowdFund, setCrowdFund] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });

  useEffect(() => {
    axios
      .get("/api/crowdfunder/")
      .then((resp) => {
        setIsLoading(false);

        if (resp.data.status === "success") {
          setCrowdFund(resp.data.message);
        }
      })
      .catch(() => {
        setIsLoading(false);
        // setMessages({message: 'Įvyko serverio klaida', status: 'danger'})
      });
  }, []);

  const List = () => {
    return crowdFund.map((value, index) => {
      // console.log(value)
      if (value.approved === 0) {
        return (
          <CfBox key={index} setMessages={setMessages} crowdfunder={value} />
        );
      }
    });
  };

  const ListContainer = () => {
    return (
      <div className="row row-cols-1 row-cols-sm2 row-cols-md-3 g-3 pt-5">
        <List />
      </div>
    );
  };

  return (
    <Container>
      <h1>Admin Panel</h1>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {messages.message && (
            <Alert variation={messages.status}>{messages.message}</Alert>
          )}
          <ListContainer />
        </>
      )}
    </Container>
  );
};
