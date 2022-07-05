import React from "react";
import "./AppHeader.css";

export default function AppHeader() {
  return (
    <div>
      <header className="header-fixed">
        <div className="header-limiter">
          <h1>
            <a href="#">
              Video<span>Streamer</span>
            </a>
          </h1>

          <nav>
            <a href="#" className="selected">
              Home
            </a>
            <a href="#">Studio</a>
            <a href="#">About</a>
          </nav>
        </div>
      </header>
    </div>
  );
}
