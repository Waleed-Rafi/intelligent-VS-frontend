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
            swal(
              "Upload Completed!",
              "Your video successfully uploaded!",
              "success"
            );
          }
        },
        (err) => {
          setShowProgressModal(false);
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            //   axios
            //     .post("/upload/video/simple", {
            //       videoUrl: url,
            //       userId: 1,
            //     })
            //     .then((res) => {
            //       alert("Successfully Uploaded");
            //     })
            //     .catch((err) => {
            //       alert("Error in uploading video");
            //     });
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
          <div className="face-blur-heading">Upload</div>
          <div className="next-btn" onClick={onVideoUploadHandler}>
            Upload
          </div>
        </div>
        <div className="face-blur-video-image-main">
          {/* <AppFileUpload
            mainTitle="Upload a Video"
            onFileChangeHandler={onFileChangeHandlerF}
          /> */}
          <input
            type="file"
            name="Upload Video"
            id=""
            onChange={onFileChangeHandlerF}
            accept=".mp4"
          />
        </div>
      </div>
    </div>
  );
}
