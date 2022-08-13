import React from "react";
import TextCard from "../TextCard/TextCard";
import "./OptionCard.css";

export default function OptionCard({
  title = "Title",
  onClickHandler = null,
  optionContainerStyles = {},
}) {
  return (
    <TextCard
      styles={{
        backgroundColor: "rgba(24,195,125, 1)",
        padding: "35px",
        boxShadow: "0 0 20px rgba(81,201,90, 0.486)",
        cursor: "pointer",
        width: "300px",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...optionContainerStyles,
      }}
      onClick={onClickHandler}
    >
      <div className="card-title">{title}</div>
    </TextCard>
  );
}
