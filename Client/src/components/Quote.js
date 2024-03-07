import React from "react";
import remove from "../images/icons/remove.png";
import { useNavigate } from "react-router-dom";
import veriefiedicon from "../images/verifiedicon.png";
import Axios from "axios";
export default function Quote(props) {
  let navigate = useNavigate();
  const colour = props.quoteData.color;
  console.log(colour);
  const color = colour === "#000" ? "#ffd617" : colour;
  const textColor = colour === "#000" ? "#000" : "#fff";

  const toprofile = () => {
    navigate("/profile/" + props.quoteData.email.replace("@gmail.com", ""));
  };
  const deleteQuote = (id) => {
    Axios.delete(`${process.env.REACT_APP_LINK}/deleteQuote/` + id).then(
      (res) => {
        alert("deleted");
      }
    );
  };
  return (
    <div className="quote">
      <div className="top">
        <div className="details">
          <div className="profilepic">
            <img onClick={toprofile} src={props.quoteData.dpurl} alt="dp" />
          </div>
          <div onClick={toprofile} className="name">
            {props.quoteData.name}
          </div>
          {props.quoteData.verified && (
            <div className="verified">
              <img src={veriefiedicon} alt="veriefied" />
            </div>
          )}
        </div>

        <div className="remove">
          {props.currentUser && (
            <img
              onClick={() => {
                deleteQuote(props.quoteData._id);
              }}
              src={remove}
              alt="remove"
            />
          )}
        </div>
      </div>
      <div
        className="quotebody"
        style={{
          backgroundColor: color,
          color: textColor,
        }}
      >
        {props.quoteData.quote}
      </div>
    </div>
  );
}
