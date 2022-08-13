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
              Home
            </Link>
            <Link to="/">Studio</Link>
            <Link to="/">About</Link>
            <Link to="/" onClick={logoutHandler}>
              Logout
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
