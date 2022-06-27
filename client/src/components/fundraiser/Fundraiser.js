import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Fundraiser.css";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import logo2 from "../../assets/img/Help.jpg";
import ProgressBar from "../utils/Progress_Bar";
import Alert from "react-bootstrap/Alert";
import DonationForm from "../DonationForm/DonationForm";
import CommentBox from "../commentBox/CommentBox";

export default (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crowdFund, setCrowdFund] = useState({});
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });

  useEffect(() => {
    axios
      .get("/api/crowdfunder/single/" + id)
      .then((resp) => {
        setIsLoading(false);
        if (resp.data.status === "success") {
          setCrowdFund(resp.data.message);
        } else {
          navigate("/fundraisers");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setMessages({ message: "Server side error", status: "danger" });
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/crowdfunder/comments/" + id)
      .then((resp) => {
        if (resp.data.status === "success") {
          setDonations(resp.data.message);
        }
      })
      .catch(() => {
        setMessages({ message: "Server side error", status: "danger" });
      });
  }, [setDonations]);

  const DonationList = () => {
    return donations.map((value, index) => {
      return <CommentBox key={index} donations={value} />;
    });
  };

  const sum = () => {
    let total = 0;
    donations.forEach((e) => {
      total += e.donation;
    });
    return total;
  };

  return (
    <Container>
      {messages.message && (
        <Alert variation={messages.status}>{messages.message}</Alert>
      )}
      {isLoading ? (
        "Loading...."
      ) : (
        <>
          <div className="crowfunder">
            <h1>{crowdFund.headline}</h1>
            <div className="crowdfunderPBar">
              <h5>
                Fundraiser has raised {sum()}$ out of {crowdFund.cf_goal}$
              </h5>
              <ProgressBar value={sum()} max={crowdFund.cf_goal} />
            </div>
            <div>
              <img className="crowdfunderPicture" src={logo2} alt="goFundMe" />
            </div>
            <div>
              <p className="crowdfundDescription">{crowdFund.description}</p>
            </div>
          </div>
          {!props.loggedIn ? (
            <h3 className="LogInToDonate">To donate please Log-In</h3>
          ) : (
            <DonationForm id={id} />
          )}
          <div className="comments">
            <h2 className="ui dividing header"> Check who already donated!</h2>
            {donations.length == 0 ? (
              <h4 style={{ color: "blue", paddingBottom: "2rem" }}>
                Nobody has donated yet, be the first one!
              </h4>
            ) : (
              <DonationList />
            )}
          </div>
        </>
      )}
    </Container>
  );
};
