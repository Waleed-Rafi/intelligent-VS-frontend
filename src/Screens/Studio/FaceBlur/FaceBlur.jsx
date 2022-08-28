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
import ModalFaceReenact from "../../../Components/AppModals/ModalFaceReenact/ModalFaceReenact";
import swal from "sweetalert";

const storage = getStorage();

export default function FaceBlur() {
  const [isVideoUpload, setIsVideoUpload] = useState(true);
  const [postData, setPostData] = useState({
    video: null,
    image: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [labelOnModal, setLabelOnModal] = useState("Uploading Source Video...");

  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showRunningMLModalAnimation, setShowRunningMLModalAnimation] =
    useState(false);

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
          setUploadProgress(prog);
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
      setShowProgressModal(true);

      const videoUrl = await uploadFileToFirebase(postData.video);
      setLabelOnModal("Uploading Target Image ...");

      const imageUrl = await uploadFileToFirebase(postData.image);

      if (videoUrl && imageUrl) {
        setLabelOnModal("Face blur in progress...");
        setShowRunningMLModalAnimation(true);

        axios
          .post("/face_blur", {
            video_url: videoUrl,
            image_url: imageUrl,
          })
          .then((res) => {
            setShowRunningMLModalAnimation(false);
            setShowProgressModal(false);
            setLabelOnModal("Uploading Source Video ...");
            swal(
              "Upload Completed!",
              "Your video successfully uploaded!",
              "success"
            );
          })
          .catch((e) => {
            setShowRunningMLModalAnimation(false);
            setShowProgressModal(false);
            setLabelOnModal("Uploading Source Video ...");
            swal("Upload Fail!", "Something went wrong, try again!", "error");
          });
      } else {
        swal("Upload Fail!", "Something went wrong, try again!", "error");
      }
    }

    setUploadProgress(0);
  };

  return (
    <div>
      <ModalFaceReenact
        isModalOpen={showProgressModal}
        uploadProgress={uploadProgress}
        label={labelOnModal}
        showMLAnimation={showRunningMLModalAnimation}
      />
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
          {isVideoUpload ? (
            <>
              <div className="simpleVideoInputVideoContainer">
                <div className="face-blur-video-image-main">
                  <input
                    type="file"
                    name="face_blur_video"
                    id="videoFile"
                    onChange={postDataChangeHandler}
                    accept=".mp4"
                  />
                  <label htmlFor="videoFile" id="simpleFileLabel">
                    <i className="bx bx-upload"></i>&nbsp; Choose Video File
                  </label>
                </div>
                {postData.video && (
                  <div className="simpleVideoDisplayContainer">
                    <video
                      className="simpleVideoDisplay"
                      src={URL.createObjectURL(postData.video)}
                      controls
                    ></video>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="simpleVideoInputVideoContainer">
                <div className="face-blur-video-image-main">
                  <input
                    type="file"
                    name="Upload Image"
                    id="imageFile"
                    onChange={postDataChangeHandler}
                    accept=".jpg"
                  />
                  <label htmlFor="imageFile" id="simpleFileLabel">
                    <i className="bx bx-upload"></i>&nbsp; Choose Image File
                  </label>
                </div>
                {postData.image && (
                  <div className="simpleVideoDisplayContainer">
                    <img
                      className="simpleVideoDisplay"
                      src={URL.createObjectURL(postData.image)}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
