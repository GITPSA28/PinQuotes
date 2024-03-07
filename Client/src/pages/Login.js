import React from "react";
import axios from "axios";
import logo from "../images/pinquoteslogo.png";
import { useState, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
function Login() {
  const [isSignedIn, setIssignedIn] = useState(false);
  const { setIsLogedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  // const REACT_APP_GOOGLE_CLIENT_ID1 = process.env.env.REACT_APP_GOOGLE_CLIENT_ID1;
  // const REACT_APP_GOOGLE_CLIENT_ID2 = process.env.env.REACT_APP_GOOGLE_CLIENT_ID2;
  const loginSuccess = (googleUser) => {
    console.log(googleUser);
    var profile = googleUser.getBasicProfile();
    axios
      .post("http://localhost:3001/createUser", {
        name: profile.getName(),
        email: profile.getEmail(),
        dpurl: profile.getImageUrl(),
        username: profile.getEmail().replace("@gmail.com", ""),
        verified: false,
      })
      .then((res) => {
        if (res.status === 200) alert("Signup Successfull");
      });
    setIssignedIn(true);
    setIsLogedIn(true);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: profile.getName(),
        email: profile.getEmail(),
        dpUrl: profile.getImageUrl(),
        username: profile.getEmail().replace("@gmail.com", ""),
        verified: false,
      })
    );
    localStorage.setItem("isSignedIn", true);
    navigate("/");
  };
  const loginFail = (response) => {
    console.log(response);
  };

  function Login() {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID1.concat(
          "-",
          process.env.REACT_APP_GOOGLE_CLIENT_ID2,
          ".apps.googleusercontent.com"
        )}
        buttonText="Sign in with Google"
        theme="dark"
        onSuccess={loginSuccess}
        onFailure={loginFail}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        signInFlow="redirect"
      />
    );
  }

  return (
    <div className="Login">
      <div className="card">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="title">Login / Register</div>
        <div className="lineBreak"></div>
        <div className="loginbtn">
          {isSignedIn ? (
            <>
              <Navigate to="/" />
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
