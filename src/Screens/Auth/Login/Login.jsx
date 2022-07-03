import React, { useState } from "react";
import AppButton from "../../../Components/AppButton/AppButton";
import AppCard from "../../../Components/AppCard/AppCard";
import AppInput from "../../../Components/AppInput/AppInput";
import videoEditorLogo from "../../../assets/video-editor.png";
import videoPlayerLogo from "../../../assets/video-player.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import AppAlert from "../../../Components/AppAlert/AppAlert";
import "./Login.css";

// auth.setPersistence(auth, browserLocalPersistence);

export default function Login() {
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const emailChangeHandler = (e) => {
    if (isLoginFailed) setIsLoginFailed(false);
    setAdminCredentials({
      ...adminCredentials,
      email: e.target.value,
    });
  };

  const passwordChangeHandler = (e) => {
    if (isLoginFailed) setIsLoginFailed(false);
    setAdminCredentials({
      ...adminCredentials,
      password: e.target.value,
    });
  };

  const submitLoginForm = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        adminCredentials.email,
        adminCredentials.password
      );
    } catch (error) {
      setIsLoginFailed(true);
    }
  };

  return (
    <div
      className="login-main"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <AppCard
        appCardContainerStyles={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
          borderRadius: "4% 0.5% 0.5% 4%",
          position: "relative",
        }}
      >
        <img src={videoPlayerLogo} alt="" style={{ height: "250px" }} />
        {isLoginFailed && (
          <AppAlert
            title="Invalid Credentials, Try Again"
            style={{ width: "70%" }}
          />
        )}
        <AppInput
          inputContainerStyles={{ marginTop: "15%" }}
          inputStyles={{ padding: "9px" }}
          type="email"
          placeholder="Email"
          onChange={emailChangeHandler}
        />
        <AppInput
          inputContainerStyles={{ marginTop: "3.5%" }}
          inputStyles={{ padding: "9px" }}
          type="password"
          placeholder="Password"
          onChange={passwordChangeHandler}
        />
        <AppButton
          title="Login"
          btnStyles={{ marginTop: "4%", cursor: "pointer" }}
          onClick={submitLoginForm}
        />
      </AppCard>

      <AppCard
        appCardContainerStyles={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          background:
            "linear-gradient(to right, rgb(27, 35, 48) 0%, rgb(13, 17, 24) 100%)",
        }}
      >
        <img
          src={videoEditorLogo}
          alt=""
          style={{ height: "30%", width: "25%", marginBottom: "6%" }}
        />
        <div
          style={{
            fontSize: "40px",
            fontWeight: 600,
            color: "#fff",
            fontFamily: "Poppins, Arial, Helvetica, sans-serif",
            textAlign: "center",
          }}
        >
          Edit Your Video's
          <br /> Intelligently
        </div>
      </AppCard>
    </div>
  );
}
