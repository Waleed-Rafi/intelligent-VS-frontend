import React from "react";
import AppFileUpload from "../../../Components/AppFileUpload/AppFileUpload";
import AppHeader from "../../../Components/AppHeader/AppHeader";
import { getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage();

export default function SimpleUpload() {
  const onFileChangeHandlerF = (file) => {
    const timeStamp = new Date().getTime();

    const storageRef = ref(storage, "/simple-videos/" + timeStamp);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };
  return (
    <div>
      <AppHeader />
      <div className="studio-face-blur-container">
        <div className="heading-section-main">
          <div className="face-blur-heading">Upload</div>
          <div className="next-btn">Upload</div>
        </div>
        <div className="face-blur-video-image-main">
          <AppFileUpload
            mainTitle="Upload a Video"
            onFileChangeHandler={onFileChangeHandlerF}
          />
        </div>
      </div>
    </div>
  );
}
