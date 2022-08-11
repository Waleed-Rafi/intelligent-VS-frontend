import React from "react";
import AppHeader from "../../Components/AppHeader/AppHeader";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <AppHeader />
      <div className="home-screen-container">
        <div className="home-screen-video-main">
          <div className="home-screen-video-with-actions">
            <video
              className="home-screen-video"
              src="https://firebasestorage.googleapis.com/v0/b/intelligent-vs.appspot.com/o/XmTKcsAVxxskhQN1.mp4?alt=media&token=c4cdd166-9a57-4515-a708-6a093408b86e"
              controls
            ></video>
            <div className="home-screen-video-actions">
              <div className="home-screen-video-action-btn">
                {/* <i class="bx bx-donate-heart"></i> */}
                <i
                  className="bx bxs-donate-heart"
                  style={{ color: "#89E8D5" }}
                ></i>
              </div>
              <div className="home-screen-video-action-btn">
                <i className="bx bxs-message-square-add"></i>
              </div>
              <div className="home-screen-video-action-btn home-screen-video-share-btn">
                <i className="bx bxs-share"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="home-screen-video-main">
          <div className="home-screen-video-with-actions">
            <video
              className="home-screen-video"
              src="https://firebasestorage.googleapis.com/v0/b/intelligent-vs.appspot.com/o/Bn80GALVW9JFGhuT.mp4?alt=media&token=dd872e98-4549-44fc-b0ca-afe9d0e830a4"
              controls
            ></video>
            <div className="home-screen-video-actions">
              <div className="home-screen-video-action-btn">
                {/* <i className="bx bx-donate-heart"></i> */}
                <i
                  className="bx bxs-donate-heart"
                  style={{ color: "#89E8D5" }}
                ></i>
              </div>
              <div className="home-screen-video-action-btn">
                <i className="bx bxs-message-square-add"></i>
              </div>
              <div className="home-screen-video-action-btn home-screen-video-share-btn">
                <i className="bx bxs-share"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="home-screen-video-main">
          <div className="home-screen-video-with-actions">
            <video
              className="home-screen-video"
              src="https://firebasestorage.googleapis.com/v0/b/intelligent-vs.appspot.com/o/OGuMbmsRZ1IQC3cX.mp4?alt=media&token=54f1a59a-0e93-4bf6-b2ab-45aae43c51e8"
              controls
            ></video>
            <div className="home-screen-video-actions">
              <div className="home-screen-video-action-btn">
                {/* <i className="bx bx-donate-heart"></i> */}
                <i
                  className="bx bxs-donate-heart"
                  style={{ color: "#89E8D5" }}
                ></i>
              </div>
              <div className="home-screen-video-action-btn">
                <i className="bx bxs-message-square-add"></i>
              </div>
              <div className="home-screen-video-action-btn home-screen-video-share-btn">
                <i className="bx bxs-share"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
