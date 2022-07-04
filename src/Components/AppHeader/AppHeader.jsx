import React from "react";
import "./AppHeader.css";

export default function AppHeader() {
  return (
    <div>
      <header class="header-fixed">
        <div class="header-limiter">
          <h1>
            <a href="#">
              Video<span>Streamer</span>
            </a>
          </h1>

          <nav>
            <a href="#">Home</a>
            <a href="#" class="selected">
              Studio
            </a>
            <a href="#">About</a>
          </nav>
        </div>
      </header>
    </div>
  );
}
