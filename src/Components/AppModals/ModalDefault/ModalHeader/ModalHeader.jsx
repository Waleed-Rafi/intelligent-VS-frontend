import React from "react";
import "./ModalHeader.css";

export default function ModalHeader({ children }) {
  return <div className="app-modal-header">{children || "Video Streamer"}</div>;
}
