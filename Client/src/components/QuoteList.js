import React from "react";
import { useState, useEffect } from "react";
import Quote from "./Quote";
import Axios from "axios";

export default function QuoteList(props) {
  const [listOfQuotes, setListOfQuotes] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [loading, setLoading] = useState(true);

  const filter = (color) => {
    const newlist = listOfQuotes.filter((quote) => quote.color.includes(color));
    setCurrentList(newlist);
  };
  const filteredQuotes = currentList.filter((quote) => {
    return quote.quote.toLowerCase().includes(searchWord);
  });
  useEffect(() => {
    setLoading(true);
    console.log(props.id);
    if (!props.id) {
      Axios.get("http://localhost:3001/getQuotes").then((res) => {
        setListOfQuotes(res.data);
        setCurrentList(res.data);
        setLoading(false);
      });
    } else {
      let str = "http://localhost:3001/getQuotes/" + props.id + "@gmail.com";
      Axios.get(str).then((res) => {
        setListOfQuotes(res.data);
        setCurrentList(res.data);
        setLoading(false);
      });
    }
  }, [props.id]);
  return (
    <>
      <div className="search">
        <input
          onChange={(event) => {
            setSearchWord(event.target.value.toLowerCase());
          }}
          type="text"
          name="search"
          id="search"
          placeholder="Search Quotes.."
        />
      </div>

      <div className="filter">
        <div className="filterText">Filter:</div>
        <button
          style={{
            backgroundColor: "black",
          }}
          onClick={() => {
            setCurrentList(listOfQuotes);
          }}
        >
          All
        </button>
        <button
          style={{ backgroundColor: "#ff5c55" }}
          onClick={() => {
            filter("#ff5c55");
          }}
        >
          Love
        </button>
        <button
          style={{ backgroundColor: "#2ec866" }}
          onClick={() => {
            filter("#2ec866");
          }}
        >
          Motivation
        </button>
        <button
          style={{ backgroundColor: "#3fa9fc" }}
          onClick={() => {
            filter("#3fa9fc");
          }}
        >
          Life
        </button>
        <button
          style={{ backgroundColor: "#000" }}
          onClick={() => {
            filter("#000");
          }}
        >
          others
        </button>
      </div>
      {!loading && (
        <div className="quoteList">
          {filteredQuotes.reverse().map((quote) => {
            return (
              <Quote key={quote._id} quoteData={quote} currentUser={props.cu} />
            );
          })}
        </div>
      )}
    </>
  );
}
