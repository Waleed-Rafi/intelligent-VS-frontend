import React, { useState } from "react";
import AppHeader from "../../../Components/AppHeader/AppHeader";
import AppFileUpload from "../../../Components/AppFileUpload/AppFileUpload";
// import "./FaceBlur.css";
import axios from "../../../axios/index";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export default function FaceReenactment() {
  const [postData, setPostData] = useState({
    poseVideo: null,
    audioSource: null,
    inputImage: null,
  });

  const poseVideoChangeHandler = (e) => {
    console.log(e.target.files[0]);
    let tempData = { ...postData };
    tempData.poseVideo = e.target.files[0];
  };

  const audioSourceVideoChangeHandler = (e) => {
    console.log(e.target.files[0]);
    let tempData = { ...postData };
    tempData.audioSource = e.target.files[0];
  };

  const inputImageChangeHandler = (e) => {
    console.log(e.target.files[0]);
    let tempData = { ...postData };
    tempData.inputImage = e.target.files[0];
  };

  const uploadFileToFirebase = (file) => {
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
          return url;
        });
      }
    );
  };

  const onUploadHandler = () => {
    if (postData.poseVideo && postData.audioSource && postData.inputImage) {
      const poseVideoUrl = uploadFileToFirebase(postData.poseVideo);
      const audioSourceUrl = uploadFileToFirebase(postData.audioSource);
      const inputImageUrl = uploadFileToFirebase(postData.inputImage);
      console.log(poseVideoUrl, audioSourceUrl, inputImageUrl);
      if (poseVideoUrl && audioSourceUrl && inputImageUrl) {
        axios
          .post("/face_reenactment", {
            input_image_url: inputImageUrl,
            input_pose_source_url: poseVideoUrl,
            input_audio_source_url: audioSourceUrl,
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
          <div className="face-blur-heading">Face Reenactment</div>
          <div>
            <span
              className="next-btn"
              style={{ marginLeft: "10px" }}
              onClick={onUploadHandler}
            >
              Upload
            </span>
          </div>
        </div>
        <div className="face-blur-video-image-main">
          <div>
            <input
              type="file"
              name=""
              id=""
              accept=".mp4"
              onChange={poseVideoChangeHandler}
            />
          </div>
          <div>
            <input
              type="file"
              name=""
              id=""
              accept=".mp4"
              onChange={audioSourceVideoChangeHandler}
            />
          </div>
          <div>
            <input
              type="file"
              name=""
              id=""
              accept=".jpg"
              onChange={inputImageChangeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
