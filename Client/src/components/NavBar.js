import React, { useContext } from "react";
import logo from "../images/pinquoteslogo.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import home from "../images/icons/home.png";
import homefill from "../images/icons/homefill.png";
import addfill from "../images/icons/addfill.png";
import add from "../images/icons/add.png";
function NavBar() {
  const { isLogedIn } = useContext(LoginContext);
  if (isLogedIn) {
    var u = JSON.parse(localStorage.getItem("user"));
    var userpath = "/profile/" + u.email.replace("@gmail.com", "");
    console.log(isLogedIn);
  }
  const toprofile = () => {
    navigate(userpath);
  };
  let navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="content">
        <div className="logo">
          <img onClick={toHome} src={logo} alt="logo" />
        </div>
        {isLogedIn ? (
          <div className="userInfo">
            <nav>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "inActiveLink"
                }
              >
                <img src={home} alt="home" />
                <img src={homefill} alt="home" />
              </NavLink>
              <NavLink
                to="/createQuote"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "inActiveLink"
                }
              >
                <img src={addfill} alt="add" />
                <img src={add} alt="addfill" />
              </NavLink>

              <div className="userdp">
                <img onClick={toprofile} src={u.dpUrl} alt="userDP" />
              </div>
              <div className="username"></div>
            </nav>
          </div>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
