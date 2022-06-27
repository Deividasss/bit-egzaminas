import React from "react";
import "./howitworks.css";

const HowItWorks = () => {
  return (
    <div className="container">
      <h1 style={{ marginBottom: "2rem" }}>How Go Fund Me works:</h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/EVkA8WWMCss"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="row gridTable">
        <div className="col-sm-4">
          <h4>1.Start your fundraiser</h4>
          <ul>
            <li>Set your fundraiser goal</li>
            <li>Tell Your story</li>
            <li>Add a picture or a video</li>
            <li>
              <a href="https://www.youtube.com/watch?v=Dcf4H8fchbE&ab_channel=gofundme">
                Watch a video tutorial
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm-4">
          <h4>2.Share with friends</h4>
          <ul>
            <li>Send emails</li>
            <li>Send text messages</li>
            <li>Share on social media</li>
            <li>
              <a href="https://www.youtube.com/watch?v=DWC2ClFUyvI&ab_channel=gofundme">
                Watch a video tutorial
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm-4">
          <h4>3.Manage donations</h4>
          <ul>
            <li>Accept donations</li>
            <li>Thank donors</li>
            <li>Withdraw funds</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
