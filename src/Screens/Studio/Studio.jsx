import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../Components/AppHeader/AppHeader";
import OptionCard from "../../Components/OptionCard/OptionCard";
import "./Studio.css";

export default function Studio() {
  const navigator = useNavigate();
  // useEffect(() => {
  //   localStorage.setItem("lastPath", window.location?.pathname);
  // }, []);

  const optionClickHandler = (path) => {
    navigator(path);
  };
  return (
    <div className="app-container studio-container">
      <AppHeader />
      <div className="studio-heading">Studio</div>
      <div className="all-cards">
        <OptionCard
          title="Face Blur"
          optionContainerStyles={{
            backgroundColor: "rgb(232 234 246)",
            color: "rgb(40 53 147)",
          }}
          onClickHandler={() => optionClickHandler("/face/blur")}
        />
        <OptionCard
          title="Face Re-Enactment"
          optionContainerStyles={{
            color: "rgb(46 125 50)",
            backgroundColor: "rgb(232 245 233)",
          }}
          onClickHandler={() => optionClickHandler("/face/reenact")}
        />
      </div>
    </div>
  );
}
