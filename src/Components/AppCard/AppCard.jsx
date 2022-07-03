import React from "react";
import "./AppCard.css";

export default function AppCard(props) {
  return (
    <div className="app-card" style={{ ...props?.appCardContainerStyles }}>
      {props.children}
    </div>
  );
}

//Just a test comment
