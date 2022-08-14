import React from "react";
import AppFileUpload from "../../../Components/AppFileUpload/AppFileUpload";
import AppHeader from "../../../Components/AppHeader/AppHeader";

export default function SimpleUpload() {
  return (
    <div>
      <AppHeader />
      <div className="studio-face-blur-container">
        <div className="heading-section-main">
          <div className="face-blur-heading">Upload</div>
          <div className="next-btn">Upload</div>
        </div>
        <div className="face-blur-video-image-main">
          <AppFileUpload mainTitle="Upload a Video" />
        </div>
      </div>
    </div>
  );
}
