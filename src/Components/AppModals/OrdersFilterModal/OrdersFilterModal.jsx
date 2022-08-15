import React, { useEffect, useState } from "react";
import ModalMain from "../ModalDefault/ModalMain/ModalMain";
import ModalHeader from "../ModalDefault/ModalHeader/ModalHeader";
import ModalBody from "../ModalDefault/ModalBody/ModalBody";
import ModalFooter from "../ModalDefault/ModalFooter/ModalFooter";
import AppMultipleInput from "../../AppMultipleInput/AppMultipleInput";
import AppInput from "../../AppInput/AppInput";
import { status } from "../../AppTable/OrderStatusList";
import axios from "../../../axios/index";
import "./OrdersFilterModal.css";

export default function OrdersFilterModal({
  isOpen = false,
  onCloseHandler = null,
  onFiltersResetHandler = null,
  onFiltersApplyHandler,
  allFilters = {},
}) {
  const [filterParams, setFilterParams] = useState({
    orderItemId: [],
    supplierName: "",
    trackingId: "",
    status: "",
    returnStatus: "",
  });
  const [statuses, setStatuses] = useState([]);
  const [returnStatuses, setReturnStatuses] = useState(["Pending", "Accepted"]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  useEffect(() => {
    setFilterParams(allFilters);
  }, [allFilters]);

  useEffect(() => {
    let tempStatuses = Object.keys(status).map((data) =>
      data.split("_").join(" ")
    );
    axios.get("/suppliers/all").then((res) => {
      const tempAllSuppliers = res.data.map((data) => data.businessName);
      setAllSuppliers(tempAllSuppliers);
    });
    setStatuses(tempStatuses);
  }, []);

  const updateFilterParamsState = (key, value) => {
    const tempFilterParams = { ...filterParams };
    tempFilterParams[key] = value;
    setFilterParams(tempFilterParams);
  };

  const orderItemIdChangeHandler = (orderItemIds) => {
    updateFilterParamsState("orderItemId", orderItemIds);
  };
  const orderStatusChangeHandler = (orderStatuses) => {
    const tempOrderStatus = orderStatuses.length ? orderStatuses[0] : "";
    updateFilterParamsState("status", tempOrderStatus); // for now we only handle single order status
  };
  const returnOrderStatusChangeHandler = (orderStatuses) => {
    const tempOrderStatus = orderStatuses.length ? orderStatuses[0] : "";
    updateFilterParamsState("returnStatus", tempOrderStatus); // for now we only handle single order status
  };

  const orderSupplierNameChangeHandler = (supplierNames) => {
    const tempSupplierName = supplierNames.length ? supplierNames[0] : "";
    updateFilterParamsState("supplierName", tempSupplierName); // for now we only handle single order status
  };

  const simpleInputsChangeHandler = (e) => {
    if (e.target.id === "trackingId") {
      updateFilterParamsState("trackingId", e.target.value);
    }
  };

  const filterApplyBtnClickHandler = () => {
    onFiltersApplyHandler(filterParams);
  };

  return (
    <ModalMain isOpen={isOpen} onClose={onCloseHandler}>
      <ModalHeader>Filters</ModalHeader>
      <ModalBody style={{ padding: "30px 20px" }}>
        <AppMultipleInput
          onChangeHandler={orderItemIdChangeHandler}
          defaultValues={filterParams.orderItemId}
        />
        <div className="app-filters-modal-row">
          <AppInput
            id="trackingId"
            placeholder="Tracking ID"
            inputStyles={{ padding: "14px 10px" }}
            onChange={simpleInputsChangeHandler}
            value={filterParams.trackingId}
          />

          <AppMultipleInput
            dropDownOptions={allSuppliers}
            placeholder="Supplier Name"
            label="Supplier Name"
            defaultValues={
              filterParams.supplierName.length
                ? [filterParams.supplierName]
                : []
            }
            isMultiSearch={false}
            onChangeHandler={orderSupplierNameChangeHandler}
          />
        </div>
        <div className="app-filters-modal-row">
          <AppMultipleInput
            dropDownOptions={statuses}
            placeholder="Order Status"
            label="Order Status"
            defaultValues={
              filterParams.status.length ? [filterParams.status] : []
            }
            isMultiSearch={false}
            onChangeHandler={orderStatusChangeHandler}
          />
          <AppMultipleInput
            dropDownOptions={returnStatuses}
            placeholder="Return Status"
            label="Return Status"
            defaultValues={
              filterParams.returnStatus.length
                ? [filterParams.returnStatus]
                : []
            }
            isMultiSearch={false}
            onChangeHandler={returnOrderStatusChangeHandler}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <div
          className="app-filters-modal-cancel-btn"
          onClick={onFiltersResetHandler}
        >
          Reset
        </div>
        <div
          className="app-filters-modal-save-btn"
          onClick={filterApplyBtnClickHandler}
        >
          Apply
        </div>
      </ModalFooter>
    </ModalMain>
  );
}
