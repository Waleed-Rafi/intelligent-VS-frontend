import React from "react";
import ModalMain from "../ModalDefault/ModalMain/ModalMain";
import ModalHeader from "../ModalDefault/ModalHeader/ModalHeader";
import ModalFooter from "../ModalDefault/ModalFooter/ModalFooter";
import ModalBody from "../ModalDefault/ModalBody/ModalBody";
export default function ModalSimpleUpload() {
  return (
    <div>
      <div>
        <ModalMain isOpen={true}>
          <ModalHeader />
        </ModalMain>
      </div>
    </div>
  );
}
