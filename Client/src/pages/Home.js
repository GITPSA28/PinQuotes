import React from "react";
import { useState, useEffect } from "react";
import QuoteList from "../components/QuoteList";
import Axios from "axios";
import { Navigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    dpUrl: "",
    verified: false,
  });
  const isSignedIn = "true" === localStorage.getItem("isSignedIn");
  useEffect(() => {
    var userData = JSON.parse(localStorage.getItem("user"));
    if (userData)
      Axios.get("http://localhost:3001/getUser/" + userData.username).then(
        (res) => {
          setUser(res.data);
          console.log(res.data);
        }
      );
  }, []);
  return (
    <div className="App home">
      {isSignedIn ? (
        <>
          <div className="heade">Welcome {user.name} !</div>
          <div className="AppBody">
            <QuoteList quoteData={user} />
          </div>
        </>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </div>
  );
}

export default Home;
