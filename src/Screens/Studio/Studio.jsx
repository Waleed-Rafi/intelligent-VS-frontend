import React from "react";
import AppHeader from "../../Components/AppHeader/AppHeader";
import AppFileUpload from "../../Components/AppFileUpload/AppFileUpload";
import "./Studio.css";

export default function Studio() {
  return (
    <div>
      <AppHeader />
      <div className="studio-face-blur-container">
        <div className="face-blur-heading">Face Blur</div>
        <div className="face-blur-video-image-main">
          <AppFileUpload />
        </div>
      </div>
    </div>
  );
}
