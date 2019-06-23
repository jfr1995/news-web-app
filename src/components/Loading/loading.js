import React from "react";
import "../../css/loader.css";

const Loading = () => {
  return (
    <div id="overlay">
      <div id="circle1" className="circle" />
      <div id="circle2" className="circle" />
      <div id="circle3" className="circle" />
    </div>
  );
};

export default Loading;
