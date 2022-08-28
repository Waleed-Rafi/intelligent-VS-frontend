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
import ModalFaceReenact from "../../../Components/AppModals/ModalFaceReenact/ModalFaceReenact";
import swal from "sweetalert";
import "./FaceReenactment.css";

const storage = getStorage();

export default function FaceReenactment() {
  const [postData, setPostData] = useState({
    poseVideo: null,
    audioSource: null,
    inputImage: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [labelOnModal, setLabelOnModal] = useState("Uploading Pose Video...");

  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showRunningMLModalAnimation, setShowRunningMLModalAnimation] =
    useState(false);

  const poseVideoChangeHandler = (e) => {
    console.log(e.target.files[0]);
    let tempData = { ...postData };
    tempData.poseVideo = e.target.files[0];
    setPostData(tempData);
  };

  const audioSourceVideoChangeHandler = (e) => {
    console.log(e.target.files[0]);
    let tempData = { ...postData };
    tempData.audioSource = e.target.files[0];
    setPostData(tempData);
  };

  const inputImageChangeHandler = (e) => {
    console.log(e.target.files[0]);
    let tempData = { ...postData };
    tempData.inputImage = e.target.files[0];
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

  const onUploadHandler = async () => {
    if (postData.poseVideo && postData.audioSource && postData.inputImage) {
      setShowProgressModal(true);
      const poseVideoUrl = await uploadFileToFirebase(postData.poseVideo);
      setLabelOnModal("Uploading Video for Audio Source...");
      const audioSourceUrl = await uploadFileToFirebase(postData.audioSource);
      setLabelOnModal("Uploading Input Image...");
      const inputImageUrl = await uploadFileToFirebase(postData.inputImage);
      if (poseVideoUrl && audioSourceUrl && inputImageUrl) {
        setLabelOnModal("Face Reenactment in process...");
        setShowRunningMLModalAnimation(true);

        axios
          .post("/face_reenactment", {
            input_image_url: inputImageUrl,
            input_pose_src_url: poseVideoUrl,
            input_audio_src_url: audioSourceUrl,
          })
          .then((res) => {
            setShowRunningMLModalAnimation(false);
            setShowProgressModal(false);
            setLabelOnModal("Uploading Pose Video...");
            swal(
              "Upload Completed!",
              "Your video successfully uploaded!",
              "success"
            );
          })
          .catch((e) => {
            setShowRunningMLModalAnimation(false);
            setShowProgressModal(false);
            setLabelOnModal("Uploading Pose Video...");
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
      <AppHeader />
      <ModalFaceReenact
        isModalOpen={showProgressModal}
        uploadProgress={uploadProgress}
        label={labelOnModal}
        showMLAnimation={showRunningMLModalAnimation}
      />
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
          <div className="inputDisplayContainer">
            <div className="face-blur-video-image-main">
              <input
                type="file"
                name="Choose Video File"
                id="poseVideo"
                onChange={poseVideoChangeHandler}
                accept=".mp4"
              />
              <label htmlFor="poseVideo" id="simpleFileLabel">
                <i className="bx bx-upload"></i>&nbsp; Choose Pose Video
              </label>
            </div>
            {postData.poseVideo && (
              <div className="simpleVideoDisplayContainer">
                <video
                  className="simpleVideoDisplay"
                  src={URL.createObjectURL(postData.poseVideo)}
                  controls
                ></video>
              </div>
            )}
          </div>
          <br />

          <div className="inputDisplayContainer">
            <div className="face-blur-video-image-main">
              <input
                type="file"
                name="Choose Video File"
                id="audioSource"
                onChange={audioSourceVideoChangeHandler}
                accept=".mp4"
              />
              <label htmlFor="audioSource" id="simpleFileLabel">
                <i className="bx bx-upload"></i>&nbsp; Choose Audio Source
              </label>
            </div>
            {postData.audioSource && (
              <div className="simpleVideoDisplayContainer">
                <video
                  className="simpleVideoDisplay"
                  src={URL.createObjectURL(postData.audioSource)}
                  controls
                ></video>
              </div>
            )}
          </div>
          <br />
          <div className="inputDisplayContainer">
            <div className="face-blur-video-image-main">
              <input
                type="file"
                name="Choose Video File"
                id="inputImage"
                onChange={inputImageChangeHandler}
                accept=".jpg"
              />
              <label htmlFor="inputImage" id="simpleFileLabel">
                <i className="bx bx-upload"></i>&nbsp; Choose Input Image
              </label>
            </div>
            {postData.inputImage && (
              <div className="simpleVideoDisplayContainer">
                <img
                  className="simpleVideoDisplay"
                  src={URL.createObjectURL(postData.inputImage)}
                  alt=""
                ></img>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
