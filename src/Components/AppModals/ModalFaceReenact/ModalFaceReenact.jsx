import React from "react";
import ModalMain from "../ModalDefault/ModalMain/ModalMain";
import ModalHeader from "../ModalDefault/ModalHeader/ModalHeader";
import ModalBody from "../ModalDefault/ModalBody/ModalBody";
import LinearProgress from "@mui/material/LinearProgress";
import mlAnimation from "../../../assets/ml-animation.gif";
import "./ModalFaceReenact.css";

export default function ModalSimpleUpload({
  isModalOpen,
  uploadProgress = 0,
  label = "Uploading Pose Video...",
  showMLAnimation = false,
}) {
  return (
    <div>
      <ModalMain isOpen={isModalOpen}>
        <ModalHeader />
        <ModalBody>
          <div className="my-progress-bar">
            <div className="my-progress-label">{label}</div>
            {!showMLAnimation ? (
              <LinearProgress variant="determinate" value={uploadProgress} />
            ) : null}
          </div>

          {showMLAnimation ? (
            <div className="ml-animation">
              <img src={mlAnimation} alt="" />
            </div>
          ) : (
            ""
          )}
          <div className="modal-info">
            <center>
              Once uploading is complete then database insertion will be done
              and it might take long by "machine learning modal" to generate
              results so be patient!
            </center>
          </div>
        </ModalBody>
      </ModalMain>
    </div>
  );
}
