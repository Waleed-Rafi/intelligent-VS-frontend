import React from "react";
import ModalMain from "../ModalDefault/ModalMain/ModalMain";
import ModalHeader from "../ModalDefault/ModalHeader/ModalHeader";
import ModalBody from "../ModalDefault/ModalBody/ModalBody";
import LinearProgress from "@mui/material/LinearProgress";
import "./ModalSimpleVideo.css";

export default function ModalSimpleUpload({ isModalOpen, uploadProgress = 0 }) {
  return (
    <div>
      <ModalMain isOpen={isModalOpen}>
        <ModalHeader />
        <ModalBody>
          <div className="my-progress-bar">
            <div className="my-progress-label">Uploading Video...</div>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </div>
          <div className="modal-info">
            <center>
              Once uploading is complete then database insertion will be done so
              be patient!
            </center>
          </div>
        </ModalBody>
      </ModalMain>
    </div>
  );
}
