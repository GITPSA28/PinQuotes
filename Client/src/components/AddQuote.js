import React from "react";
import { useState } from "react";
import Axios from "axios";
function AddQuote(props) {
  const [color, setColor] = useState("#000");
  const [quote, setQuote] = useState("");

  const user = props.user;
  const createQuote = () => {
    if (quote) {
      Axios.post(`${process.env.REACT_APP_LINK}/createQuote`, {
        name: user.name,
        email: user.email,
        dpurl: user.dpUrl,
        quote: quote,
        color: color,
      }).then((res) => {
        alert("Quote added Successfully");
      });
    } else {
      alert("Type some Quote");
    }
  };

  return (
    <div className="createPost">
      <div className="createQuote">
        <div className="header">
          <div className="userdp">
            <img src={props.user.dpUrl} alt="dp" />
          </div>

          <div className="title">Create Quote</div>
        </div>
        <div className="inputQuote">
          <textarea
            type="text"
            placeholder="Enter your quote here..."
            maxLength={100}
            onChange={(e) => {
              setQuote(e.target.value);
            }}
          />
        </div>
        <div className="inputButtons">
          <div className="colourSelection">
            <div
              className="currentColour"
              style={{ backgroundColor: color }}
            ></div>
            Theme:
            <button
              style={{ backgroundColor: "#ff5c55" }}
              onClick={() => {
                setColor("#ff5c55");
              }}
            >
              Love
            </button>
            <button
              style={{ backgroundColor: "#2ec866" }}
              onClick={() => {
                setColor("#2ec866");
              }}
            >
              Motivation
            </button>
            <button
              style={{ backgroundColor: "#3fa9fc" }}
              onClick={() => {
                setColor("#3fa9fc");
              }}
            >
              Life
            </button>
            <button
              style={{ backgroundColor: "#000" }}
              onClick={() => {
                setColor("#000");
              }}
            >
              others
            </button>
          </div>
          <div className="post">
            <button className="postButton" onClick={createQuote}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuote;
