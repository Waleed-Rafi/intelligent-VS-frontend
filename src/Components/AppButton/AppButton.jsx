import React from "react";
import "./AppButton.css";

export default function AppButton({ btnStyles, onClick, title }) {
  return (
    <div className="app-btn-main" style={{ ...btnStyles }} onClick={onClick}>
      {title || "Login"}
    </div>
  );
}
