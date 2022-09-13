import React, { useEffect } from "react";
import AppHeader from "../../Components/AppHeader/AppHeader";
import axios from "../../axios/index";
import "./Home.css";
import { useState } from "react";
import loadingAnimation from "../../assets/loading1.gif";
import ModalShareVideo from "../../Components/AppModals/ModalShareVideo/ModalShareVideo";

export default function Home() {
  const [allVideosData, setAllVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("/videos/all")
        .then((res) => {
          setIsLoading(false);
          console.log(res.data.data);
          setAllVideoData(res.data.data);
        })
        .catch((err) => {
          setIsLoading(false);
          setAllVideoData([
            [
              0,
              "https://firebasestorage.googleapis.com/v0/b/intelligent-vs.appspot.com/o/output%2FmyVideo1661623979.177079.mp4?alt=media&token=fa185e25-59fd-4dcb-82de-04875fe1f0c8",
            ],
            [
              0,
              "https://firebasestorage.googleapis.com/v0/b/intelligent-vs.appspot.com/o/output%2FmyVideo1661623979.177079.mp4?alt=media&token=fa185e25-59fd-4dcb-82de-04875fe1f0c8",
            ],
          ]);
        });
    }, 3000);
  }, []);

  const likeVideoHandler = (video) => {
    console.log(video);
    console.log("Video Id: ", video[0]);
    console.log("User Id: ", video[2]);
  };

  const onClose = () => {
    setOpenShareModal(false);
  };

  const shareVideoHandler = (url) => {
    setVideoUrl(url);
    setOpenShareModal(true);
  };

  return (
    <div>
      <ModalShareVideo
        isOpen={openShareModal}
        videoUrl={videoUrl}
        onClose={onClose}
      />
      <AppHeader />
      <div className="home-screen-container">
        {isLoading ? (
          <div className="loading-animation-container">
            <img src={loadingAnimation} alt="" />
          </div>
        ) : (
          <div className="ads-videos-top-container">
            <div className="home-screen-ads">
              <img
                src="https://i.pinimg.com/236x/77/0c/da/770cda30b5de34269b1a500cfe96d9d1--job-ads-sale-poster.jpg"
                alt=""
              />
            </div>
            <div>
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
                        <div
                          className="home-screen-video-action-btn"
                          onClick={() => likeVideoHandler(video)}
                        >
                          <i
                            className="bx bxs-donate-heart"
                            style={{ color: "#89E8D5" }}
                          ></i>
                        </div>

                        <div
                          className="home-screen-video-action-btn home-screen-video-share-btn"
                          onClick={() => shareVideoHandler(video[1])}
                        >
                          <i className="bx bxs-share"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="home-screen-top-video">
              <div className="home-most-liked">Most Liked</div>
              <video
                src="https://firebasestorage.googleapis.com/v0/b/intelligent-vs.appspot.com/o/output%2FmyVideo1661623979.177079.mp4?alt=media&token=fa185e25-59fd-4dcb-82de-04875fe1f0c8"
                alt=""
                controls
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
