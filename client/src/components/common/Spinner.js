import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "20px", margin: "10rem", display: "block" }}
        alt="loading..."
      />
    </div>
  );
}
