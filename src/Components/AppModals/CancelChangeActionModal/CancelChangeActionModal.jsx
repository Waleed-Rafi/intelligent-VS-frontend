import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AppRadioButton from "../../AppRadioButton/AppRadioButton";
import AppTextArea from "../../AppTextArea/AppTextArea";
import "./CancelChangeActionModal.css";

export default function CancelChangeActionModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [newAddress, setNewAddress] = useState(
    "House# 85 Street 2 Rawalpindi House# 85 Street 2 Rawalpindi House# 85 Street 2 Rawalpindi"
  );
  useEffect(() => {
    if (props.isOpen) setIsOpen(true);
  }, [props.isOpen]);

  const handleClose = () => {
    if (isOpen) setIsOpen(false);
    props.onModalClose();
  };

  const addressChangeHandler = (e) => {
    setNewAddress(e.target.value);
  };

  return (
    <React.Fragment>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="app-modal-main"
      >
        <Box className="app-modal-box-main">
          <div className="app-modal-header">Order Item Id: #111</div>
          <div className="app-modal-body">
            {props.modalChangeAddress && (
              <div className="app-modal-grid">
                <div className="app-modal-grid-left">
                  <div>Old Address</div>
                  <AppTextArea
                    isReadOnly={true}
                    textAreaStyles={{ width: "100%" }}
                    value="House# 85 Street 2 Rawalpindi House# 85 Street 2 Rawalpindi House# 85 Street 2 Rawalpindi"
                  />
                </div>
                <div className="app-modal-grid-right">
                  <div>New Address</div>
                  <AppTextArea
                    value={newAddress}
                    onChange={addressChangeHandler}
                  />
                </div>
              </div>
            )}

            {props.modalCancelOrder && (
              <div className="app-modal-cancel-list">
                <div className="app-modal-question">
                  Please select a reason to cancel the order.
                </div>
                <div className="app-modal-reasons-list">
                  <AppRadioButton title="Dummy Reason 1" id="first" />
                  <AppRadioButton title="Reason 2" id="second" />
                  <AppRadioButton title="Dummy Reason 3" id="third" />
                  <AppRadioButton title="Reason 4" id="fourth" />
                  <AppRadioButton title="Other" id="fifth" />
                </div>
              </div>
            )}
          </div>
          <div className="app-modal-footer">
            <div className="app-modal-cancel-btn" onClick={handleClose}>
              Cancel
            </div>
            <div className="app-modal-save-btn">Save</div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
