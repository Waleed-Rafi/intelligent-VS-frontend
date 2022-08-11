import React from "react";

export default function AppAlert({ title = "Alert", style = {} }) {
  return (
    <div className="alert alert-danger" role="alert" style={{ ...style }}>
      {title}
    </div>
  );
}
