import React from "react";
import ModalMain from "../ModalDefault/ModalMain/ModalMain";
import ModalHeader from "../ModalDefault/ModalHeader/ModalHeader";
import ModalBody from "../ModalDefault/ModalBody/ModalBody";
import LinearProgress from "@mui/material/LinearProgress";
import "./ModalSimpleVideo.css";

export default function ModalSimpleUpload({ progress = 10 }) {
  return (
    <div>
      <ModalMain isOpen={true}>
        <ModalHeader />
        <ModalBody>
          <div className="my-progress-bar">
            <div className="my-progress-label">Uploading Video...</div>
            <LinearProgress variant="determinate" value={progress} />
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
