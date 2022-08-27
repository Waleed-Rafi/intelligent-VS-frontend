import React from "react";
import AppFileUpload from "../../../Components/AppFileUpload/AppFileUpload";
import AppHeader from "../../../Components/AppHeader/AppHeader";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import axios from "../../../axios/index";
import ModalSimpleUpload from "../../../Components/AppModals/ModalSimpleVideoUpload/ModalSimpleUpload";
import swal from "sweetalert";
import "./SimpleUpload.css";

const storage = getStorage();

export default function SimpleUpload() {
  const [myFile, setMyFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const onFileChangeHandlerF = (e) => {
    const file = e.target.files[0];
    setMyFile(file);
  };

  const onVideoUploadHandler = () => {
    if (myFile) {
      setShowProgressModal(true);
      const timeStamp = new Date().getTime();

      const storageRef = ref(storage, "/simple-videos/" + timeStamp);

      const uploadTask = uploadBytesResumable(storageRef, myFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(prog);
          setUploadProgress(prog);
          if (prog > 99) {
            setShowProgressModal(false);
          }
        },
        (err) => {
          setShowProgressModal(false);
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            axios
              .post("/upload/video/simple", {
                videoUrl: url,
                userId: 1,
              })
              .then((res) => {
                swal(
                  "Upload Completed!",
                  "Your video successfully uploaded!",
                  "success"
                );
              })
              .catch((err) => {
                swal(
                  "Error Uploading",
                  "Something went wrong, Try again!",
                  "error"
                );
              });
          });
        }
      );
    }
  };
  return (
    <div>
      <ModalSimpleUpload
        isModalOpen={showProgressModal}
        uploadProgress={uploadProgress}
      />
      <AppHeader />
      <div className="studio-face-blur-container">
        <div className="heading-section-main">
          <div className="face-blur-heading">Simple Video</div>
          <div className="next-btn" onClick={onVideoUploadHandler}>
            Upload
          </div>
        </div>
        <div className="simpleVideoInputVideoContainer">
          <div className="face-blur-video-image-main">
            {/* <AppFileUpload
            mainTitle="Upload a Video"
            onFileChangeHandler={onFileChangeHandlerF}
          /> */}
            <input
              type="file"
              name="Choose Video File"
              id="simpleFile"
              onChange={onFileChangeHandlerF}
              accept=".mp4"
            />
            <label htmlFor="simpleFile" id="simpleFileLabel">
              <i className="bx bx-upload"></i>&nbsp; Choose Video File
            </label>
          </div>
          {myFile && (
            <div className="simpleVideoDisplayContainer">
              <video
                className="simpleVideoDisplay"
                src={URL.createObjectURL(myFile)}
                controls
              ></video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
