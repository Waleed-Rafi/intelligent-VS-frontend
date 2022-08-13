import React from "react";
import "./TextCard.css";

export default function TextCard({ children, styles = {}, ...otherProps }) {
  return (
    <div className="text-card" {...otherProps} style={{ ...styles }}>
      {children}
    </div>
  );
}
