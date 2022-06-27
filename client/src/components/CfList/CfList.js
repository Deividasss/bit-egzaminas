import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import CfListBox from "../CfListBox/CfListBox";
import "./CfList.css";

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
      });
  }, []);

  const ListActual = () => {
    return crowdFund.map((value, index) => {
      if (value.approved === 1 && value.success === 0) {
        return (
          <CfListBox
            key={index}
            setMessages={setMessages}
            crowdfunder={value}
            link="/crowdfunder/"
          />
        );
      }
    });
  };

  const ListPast = () => {
    if (crowdFund) {
      return crowdFund.map((value, index) => {
        if (value.approved === 1 && value.success === 1) {
          return (
            <CfListBox
              key={index}
              setMessages={setMessages}
              crowdfunder={value}
              link="/crowdfunder/"
            />
          );
        }
      });
    }
  };

  const ListContainer = () => {
    return (
      <>
        <h1 className="h1first">Current Fundraisers</h1>
        <div className="row">
          <ListActual />
        </div>
        <h1 className="h1second">Completed Fundraisers</h1>
        <div className="row">
          <ListPast />
        </div>
      </>
    );
  };

  return (
    <Container>
      <h1 className="h1header">Current and previous Crowdfunders</h1>
      {isLoading ? (
        "Loading...."
      ) : (
        <>
          <ListContainer />
        </>
      )}
    </Container>
  );
};
