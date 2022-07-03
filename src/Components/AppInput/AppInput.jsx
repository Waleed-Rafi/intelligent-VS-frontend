import React from "react";
import "./AppInput.css";

export default function AppInput({
  id,
  inputContainerStyles,
  type,
  placeholder,
  inputStyles,
  isReadOnly,
  value,
  onChange,
}) {
  return (
    <div className="app-input input-group" style={{ ...inputContainerStyles }}>
      <input
        id={id}
        type={type || "text"}
        className="form-control"
        placeholder={placeholder || ""}
        aria-label="Username"
        aria-describedby="basic-addon1"
        style={{ ...inputStyles }}
        readOnly={isReadOnly || false}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
