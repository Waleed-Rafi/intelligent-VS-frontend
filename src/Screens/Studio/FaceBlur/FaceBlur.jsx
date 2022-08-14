import React, { useState } from "react";
import AppHeader from "../../../Components/AppHeader/AppHeader";
import AppFileUpload from "../../../Components/AppFileUpload/AppFileUpload";
import "./FaceBlur.css";

export default function FaceBlur() {
  const [isVideoUpload, setIsVideoUpload] = useState(true);
  const toggleNextBackBtn = () => {
    setIsVideoUpload(!isVideoUpload);
  };
  return (
    <div>
      <AppHeader />
      <div className="studio-face-blur-container">
        <div className="heading-section-main">
          <div className="face-blur-heading">Face Blur</div>
          {isVideoUpload ? (
            <div className="next-btn" onClick={toggleNextBackBtn}>
              Next <i className="bx bx-right-arrow-alt"></i>
            </div>
          ) : (
            <div>
              <span className="prev-btn" onClick={toggleNextBackBtn}>
                <i className="bx bx-left-arrow-alt"></i> Back
              </span>
              <span
                className="next-btn"
                style={{ marginLeft: "10px" }}
                onClick={toggleNextBackBtn}
              >
                Upload
              </span>
            </div>
          )}
        </div>
        <div className="face-blur-video-image-main">
          {isVideoUpload ? (
            <AppFileUpload
              mainTitle="Upload a Video"
              subTitle="File should be a video"
            />
          ) : (
            <AppFileUpload mainTitle="Upload an Image" />
          )}
        </div>
      </div>
    </div>
  );
}
