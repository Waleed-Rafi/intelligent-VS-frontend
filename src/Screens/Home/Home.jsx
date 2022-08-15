import React, { useEffect } from "react";
import AppHeader from "../../Components/AppHeader/AppHeader";
import axios from "../../axios/index";
import "./Home.css";
import { useState } from "react";
import loadingAnimation from "../../assets/loading1.gif";

export default function Home() {
  const [allVideosData, setAllVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      axios.get("/videos/all").then((res) => {
        setIsLoading(false);
        console.log(res.data.data);
        setAllVideoData(res.data.data);
      });
    }, 3000);
  }, []);

  return (
    <div>
      <AppHeader />
      <div className="home-screen-container">
        {isLoading ? (
          <div className="loading-animation-container">
            <img src={loadingAnimation} alt="" />
          </div>
        ) : null}
        {allVideosData.map((video) => {
          return (
            <div className="home-screen-video-main" key={video[0]}>
              <div className="home-screen-video-with-actions">
                <video
                  className="home-screen-video"
                  src={video[1]}
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
          );
        })}
      </div>
    </div>
  );
}
