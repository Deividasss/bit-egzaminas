import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CfListBox.css";

export default (props) => {
  const date = new Date(props.crowdfunder.createdAt);
  const description = props.crowdfunder.description;

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios
      .get("/api/crowdfunder/comments/" + props.crowdfunder.id)
      .then((resp) => {
        if (resp.data.status === "success") {
          setDonations(resp.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="col-sm-4">
      <div className="card_body">
        <img
          className="cf_image"
          src={"/uploads/" + props.crowdfunder.cf_image}
          alt="image"
        />
        <div className="card-text">
          <h2>{props.crowdfunder.name} {props.crowdfunder.last_name}</h2>
          <h3>{props.crowdfunder.specialization}</h3>
          <h4>{props.crowdfunder.servise_name}</h4>
          <h4>{props.crowdfunder.city}</h4>
          <div className="btn-group">
            <small className="text-muted">
              Created: {date.toLocaleDateString("lt-LT")}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
