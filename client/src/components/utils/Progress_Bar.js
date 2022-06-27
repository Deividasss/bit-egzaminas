import React from "react";
import PropTypes from "prop-types";
import "./Progress_Bar.css";

const ProgressBar = ({ value, max }) => {
  return (
    <>
      <progress className="progress" value={value} max={max}>
        <span>{(value / max) * 100}%</span>
      </progress>
      <span>{((value / max) * 100).toFixed(0)}%</span>
    </>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
};

ProgressBar.defaultProps = {
  max: 100,
};

export default ProgressBar;
