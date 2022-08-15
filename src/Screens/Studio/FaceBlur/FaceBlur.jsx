import React, { useState } from "react";
import AppHeader from "../../../Components/AppHeader/AppHeader";
import AppFileUpload from "../../../Components/AppFileUpload/AppFileUpload";
import "./FaceBlur.css";
import axios from "../../../axios/index";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export default function FaceBlur() {
  const [isVideoUpload, setIsVideoUpload] = useState(true);
  const [postData, setPostData] = useState({
    video: null,
    image: null,
  });

  const toggleNextBackBtn = () => {
    setIsVideoUpload(!isVideoUpload);
  };

  const postDataChangeHandler = (e) => {
    let tempData = { ...postData };
    if (isVideoUpload) {
      tempData.video = e.target.files[0];
    } else {
      tempData.image = e.target.files[0];
    }
    setPostData(tempData);
  };

  const uploadFileToFirebase = async (file) => {
    const myPromise = new Promise((resolve, reject) => {
      const timeStamp = new Date().getTime();

      const storageRef = ref(storage, "/simple-videos/" + timeStamp);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(prog);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            resolve(url);
          });
        }
      );
    });
    return myPromise;
  };

  const postDataUploadHandler = async () => {
    if (postData.image && postData.video) {
      const videoUrl = await uploadFileToFirebase(postData.video);
      const imageUrl = await uploadFileToFirebase(postData.image);

      if (videoUrl && imageUrl) {
        axios
          .post("/face_blur", {
            video_url: videoUrl,
            image_url: imageUrl,
          })
          .then((res) => {
            alert("Successfully uploaded!");
          })
          .catch((e) => {
            alert("Error in uploading!");
          });
      } else {
        alert("ERROR: Something went wrong in uploading!");
      }
    }
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
                onClick={postDataUploadHandler}
              >
                Upload
              </span>
            </div>
          )}
        </div>
        <div className="face-blur-video-image-main">
          {/* // <AppFileUpload
          //   mainTitle="Upload a Video"
          //   subTitle="File should be a video"
          // /> */}
          {isVideoUpload ? (
            <input
              type="file"
              name="Upload Video"
              id=""
              onChange={postDataChangeHandler}
              accept=".mp4"
            />
          ) : (
            <input
              type="file"
              name="Upload Video"
              id=""
              onChange={postDataChangeHandler}
              accept=".jpg"
            />
          )}
          {/* <AppFileUpload mainTitle="Upload an Image" /> */}
        </div>
      </div>
    </div>
  );
}
