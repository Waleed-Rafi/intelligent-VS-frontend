import React from "react";
import ModalBody from "../ModalDefault/ModalBody/ModalBody";
import ModalHeader from "../ModalDefault/ModalHeader/ModalHeader";
import ModalMain from "../ModalDefault/ModalMain/ModalMain";
import ModalFooter from "../ModalDefault/ModalFooter/ModalFooter";
import AppInput from "../../AppInput/AppInput";
import "./ModalShareVideo.css";

export default function ModalShareVideo({
  videoUrl = "https://",
  isOpen = false,
  onClose,
}) {
  return (
    <div>
      <ModalMain isOpen={isOpen} onClose={onClose}>
        <ModalHeader />
        <ModalBody>
          <div className="copy-share-label">Copy and Share</div>
          <AppInput
            onChange={() => {}}
            inputContainerStyles={{ width: "100%" }}
            value={videoUrl}
            isReadOnly={true}
          />
        </ModalBody>
        <ModalFooter>
          <div
            className="copy-btn"
            onClick={() => {
              window.navigator.clipboard.writeText(videoUrl);
            }}
          >
            Copy
          </div>
        </ModalFooter>
      </ModalMain>
    </div>
  );
}
