import React from "react";
import "./ModalBody.css";

export default function ModalBody({ children, style }) {
  return (
    <div className="app-modal-body" style={style}>
      {children || "Body"}
    </div>
  );
}
