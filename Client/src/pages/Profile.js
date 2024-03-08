import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import QuoteList from "../components/QuoteList";
import { LoginContext } from "../contexts/LoginContext";
import { GoogleLogout } from "@leecheuk/react-google-login";

import ProfileHead from "../components/ProfileHead";
function Profile(props) {
  // const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isSignedIn, setIssignedIn] = useState(() => {
    return "true" === localStorage.getItem("isSignedIn");
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return false;
  });
  const { id } = useParams();
  const [CID, setCID] = useState(id);
  const { setIsLogedIn } = useContext(LoginContext);
  useEffect(() => {
    setCID(id);
    setCurrentUser(
      id + "@gmail.com" === JSON.parse(localStorage.getItem("user")).email
    );
  }, [id]);
  const logout = (response) => {
    console.log("logiut sucsss");

    localStorage.setItem(
      "user",
      JSON.stringify({ name: "", email: "", dpUrl: "" })
    );
    localStorage.setItem("isSignedIn", false);
    setIsLogedIn(false);
    setIssignedIn(false);
  };
  function Logout() {
    return (
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID1.concat(
          "-",
          process.env.REACT_APP_GOOGLE_CLIENT_ID2,
          ".apps.googleusercontent.com"
        )}
        render={(renderProps) => (
          <button
            className="logoutbtn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Logout
          </button>
        )}
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    );
  }

  return (
    <div className="profileBG">
      {isSignedIn ? (
        <></>
      ) : (
        <>
          <Navigate to="/" />
        </>
      )}

      <div className="profile">
        <br />
        <div className="profileHead">
          <ProfileHead id={CID} />
        </div>

        <br />
        <QuoteList id={CID} cu={currentUser} />
        {currentUser && <Logout />}
      </div>
    </div>
  );
}

export default Profile;
