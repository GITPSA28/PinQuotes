import React, { useState } from "react";
import { useEffect } from "react";
import AddQuote from "../components/AddQuote";
import { Navigate } from "react-router-dom";

function CreateQuote() {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const isSignedIn = "true" === localStorage.getItem("isSignedIn");

  return (
    <>
      {isSignedIn ? <></> : <Navigate to="/login" />}

      <div className="createQuotePage">
        <div className="heade">POST QUOTE</div>
        <div className="aqbody">
          <AddQuote user={user} />
        </div>
      </div>
    </>
  );
}

export default CreateQuote;
