import React from "react";
import "./CommentBox.css";

export default (props) => {
  console.log(props);
  return (
    <div className="comment-box">
      <h5 className="commentAuthor">{props.donations.name}</h5>
      <div className="commentText">{props.donations.comment}</div>
      <div className="commentDonation">
        Donated: {props.donations.donation}$
      </div>
    </div>
  );
};
