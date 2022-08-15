import React, { useEffect, useState } from "react";
import ModalBody from "../ModalDefault/ModalBody/ModalBody";
import ModalFooter from "../ModalDefault/ModalFooter/ModalFooter";
import ModalHeader from "../ModalDefault/ModalHeader/ModalHeader";
import ModalMain from "../ModalDefault/ModalMain/ModalMain";
import AppDropDown from "../../AppDropDown/AppDropDown";
import { MenuItem } from "@mui/material";
import AppTextArea from "../../AppTextArea/AppTextArea";
import axios from "../../../axios/index";
import AppInput from "../../AppInput/AppInput";
// import "./CancelChangeActionModal.css";

export default function OrderReturnModal({
  isOpen,
  onModalClose,
  onRefundHandler,
  onReturnReplacementHandler,
  onApplyPenaltyToSupplier,
  title = "Return",
  orderDetail,
}) {
  const [isModalOpen, setIsOpen] = useState(false);
  const [returnType, setReturnType] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [deliveryPartner, setDeliveryPartner] = useState("leopards");
  const [productStatus, setProductStatus] = useState("");
  const [supplierPenaltyAmount, setSupplierPenaltyAmount] = useState("");
  const [penaltyReason, setPenaltyReason] = useState("");

  useEffect(() => {
    if (isOpen) setIsOpen(true);
    if (isOpen) {
      axios
        .get(`/v1/product/status/${orderDetail.supplierProductCode}`)
        .then((res) => {
          setProductStatus(res.data.status);
        });
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isModalOpen) setIsOpen(false);
    onModalClose();
  };

  const handleReturnTypeChange = (data) => {
    const value = data.target.value;
    setReturnType(value);
  };

  const deliveryPartnerChangeHandler = (data) => {
    const value = data.target.value;
    setDeliveryPartner(value);
  };

  const returnReasonValueChangeHandler = (e) => {
    setReturnReason(e.target.value);
  };

  const onReturnModalSubmitHandler = () => {
    if (returnType === "Refund") {
      onRefundHandler(returnType, returnReason, deliveryPartner);
    } else if (returnType === "Replace") {
      onReturnReplacementHandler(returnType, returnReason, deliveryPartner);
    }

    if (supplierPenaltyAmount && penaltyReason.trim().length) {
      onApplyPenaltyToSupplier(supplierPenaltyAmount, penaltyReason);
    }

    handleClose();
  };

  const penaltyAmountChangeHandler = (e) => {
    setSupplierPenaltyAmount(e.target.value);
  };

  const penaltyReasonChangeHandler = (e) => {
    setPenaltyReason(e.target.value);
  };

  return (
    <React.Fragment>
      <ModalMain isOpen={isModalOpen} onClose={handleClose}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody style={{ padding: "30px 20px" }}>
          <div>
            {productStatus && <p style={{ color: "red" }}>{productStatus}</p>}
            <AppDropDown
              title="Return Type"
              containerStyles={{ width: "100%", marginLeft: 0 }}
              onChangeHandler={handleReturnTypeChange}
              selectedValue={returnType}
            >
              {productStatus.toLowerCase() === "active" && (
                <MenuItem value="Replace">Replace</MenuItem>
              )}
              <MenuItem value="Refund" defaultChecked={true}>
                Refund
              </MenuItem>
            </AppDropDown>
            <AppDropDown
              title="Reason"
              containerStyles={{ width: "100%", marginLeft: 0 }}
              onChangeHandler={returnReasonValueChangeHandler}
              selectedValue={returnReason}
            >
              <MenuItem value="Defected Item" defaultChecked={true}>
                Defected Item
              </MenuItem>
              <MenuItem value="Quality Issue">Quality Issue</MenuItem>
              <MenuItem value="Anomaly">Anomaly</MenuItem>
              <MenuItem value="Missing Item">Missing Item</MenuItem>
              <MenuItem value="Different item">Different item</MenuItem>
              <MenuItem value="Colour issue">Colour issue</MenuItem>
              <MenuItem value="Advance Payment Failure">
                Advance Payment Failure
              </MenuItem>
              <MenuItem value="Real/Image Issue">Real/Image Issue</MenuItem>
              <MenuItem value="Description Issue">Description Issue</MenuItem>
              <MenuItem value="Size Issue">Size Issue</MenuItem>
            </AppDropDown>
            <AppTextArea
              placeholder="Detail (Not Active Yet!)"
              textAreaContainerStyles={{ margin: "10px 0" }}
            />
            <AppDropDown
              title="Delivery Partner"
              containerStyles={{ width: "100%", marginLeft: 0 }}
              selectedValue={deliveryPartner}
              onChange={deliveryPartnerChangeHandler}
            >
              <MenuItem value="leopards" defaultChecked={true}>
                leopards
              </MenuItem>
            </AppDropDown>
            <AppInput
              type="number"
              placeholder="Penalty Amount"
              inputContainerStyles={{ marginTop: "20px", width: "100%" }}
              value={supplierPenaltyAmount}
              onChange={penaltyAmountChangeHandler}
            />
            <AppTextArea
              placeholder="Reason of Penalty"
              textAreaContainerStyles={{ marginTop: "20px" }}
              value={penaltyReason}
              onChange={penaltyReasonChangeHandler}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="app-modal-cancel-btn" onClick={handleClose}>
            Close
          </div>
          <div
            className="app-modal-save-btn"
            onClick={onReturnModalSubmitHandler}
          >
            Submit
          </div>
        </ModalFooter>
      </ModalMain>
    </React.Fragment>
  );
}
