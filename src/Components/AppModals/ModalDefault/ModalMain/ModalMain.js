import React from "react";
import { Modal, Box } from "@mui/material";
import "./ModalMain.css";

export default function ModalMain({
  isOpen = false,
  onClose = null,
  children,
}) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="app-modal-main"
    >
      <Box className="app-modal-box-main">{children}</Box>
    </Modal>
  );
}
