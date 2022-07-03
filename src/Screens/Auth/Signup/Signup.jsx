import React, { useState } from "react";
import AppButton from "../../../Components/AppButton/AppButton";
import AppCard from "../../../Components/AppCard/AppCard";
import AppInput from "../../../Components/AppInput/AppInput";
import videoEditorLogo from "../../../assets/video-editor.png";
import videoPlayerLogo from "../../../assets/video-player.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import AppAlert from "../../../Components/AppAlert/AppAlert";
import "./Signup.css";

// auth.setPersistence(auth, browserLocalPersistence);

export default function SignUp() {
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });
  const [isSignUpFailed, setIsSignUpFailed] = useState(false);

  const emailChangeHandler = (e) => {
    if (isSignUpFailed) setIsSignUpFailed(false);
    setAdminCredentials({
      ...adminCredentials,
      email: e.target.value,
    });
  };

  const passwordChangeHandler = (e) => {
    if (isSignUpFailed) setIsSignUpFailed(false);
    setAdminCredentials({
      ...adminCredentials,
      password: e.target.value,
    });
  };

  const submitSignUpForm = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        adminCredentials.email,
        adminCredentials.password
      );
    } catch (error) {
      setIsSignUpFailed(true);
    }
  };

  return (
    <div
      className="SignUp-main"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div className="SignUp-left">
        <AppCard
          appCardContainerStyles={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4% 0.5% 0.5% 4%",
            position: "relative",
          }}
        >
          <img
            src={videoPlayerLogo}
            alt=""
            className="SignUp-video-player-logo"
          />
          {isSignUpFailed && (
            <AppAlert
              title="Invalid Credentials, Try Again"
              style={{ width: "70%" }}
            />
          )}
          <AppInput
            inputContainerStyles={{ marginTop: "15%" }}
            inputStyles={{ padding: "9px" }}
            type="User Name"
            placeholder="User Name"
            onChange={emailChangeHandler}
          />
          <AppInput
            inputContainerStyles={{ marginTop: "3.5%" }}
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
            title="SignUp"
            btnStyles={{ marginTop: "4%", cursor: "pointer" }}
            onClick={submitSignUpForm}
          />
          <div className="SignUp-dont-have-account-link">
            Already have an account?
          </div>
        </AppCard>
      </div>

      <div className="SignUp-right">
        <AppCard
          appCardContainerStyles={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(to right, rgb(27, 35, 48) 0%, rgb(13, 17, 24) 100%)",
          }}
        >
          <img
            src={videoEditorLogo}
            alt=""
            className="SignUp-video-editor-logo"
          />
          <div className="SignUp-right-unique-point-heading">
            Edit Your Video's
            <br /> Intelligently
          </div>
        </AppCard>
      </div>
    </div>
  );
}
