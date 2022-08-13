import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "./AppHeader.css";

export default function AppHeader() {
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      // setIsLoginFailed(true);
    }
  };
  return (
    <div>
      <header className="header-fixed">
        <div className="header-limiter">
          <h1>
            <Link to="/">
              Video<span>Streamer</span>
            </Link>
          </h1>

          <nav>
            <Link to="/" className="selected">
              <i className="bx bxs-home"></i> Home
            </Link>
            <Link to="/studio">
              <i className="bx bxs-video"></i> Studio
            </Link>
            <Link to="/" onClick={logoutHandler}>
              <i className="bx bxs-user"></i> Logout
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
