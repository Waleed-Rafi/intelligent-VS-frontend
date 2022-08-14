import React from "react";
import AppHeader from "../../../Components/AppHeader/AppHeader";
import AppFileUpload from "../../../Components/AppFileUpload/AppFileUpload";
import "./FaceBlur.css";

export default function FaceBlur() {
  return (
    <div>
      <AppHeader />
      <div className="studio-face-blur-container">
        <div className="face-blur-heading">Face Blur</div>
        <div className="face-blur-video-image-main">
          <AppFileUpload
            mainTitle="Upload a Video"
            subTitle="File should be a video"
          />
          <AppFileUpload mainTitle="Upload an Image" />
        </div>
      </div>
    </div>
  );
}
