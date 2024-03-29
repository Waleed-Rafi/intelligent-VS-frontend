import React, { useState } from "react";
import AppButton from "../../../Components/AppButton/AppButton";
import AppCard from "../../../Components/AppCard/AppCard";
import AppInput from "../../../Components/AppInput/AppInput";
import videoEditorLogo from "../../../assets/video-editor.png";
import videoPlayerLogo from "../../../assets/video-player.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import AppAlert from "../../../Components/AppAlert/AppAlert";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import axios from "../../../axios/index";
import "./Login.css";

// auth.setPersistence(auth, browserLocalPersistence);

export default function Login() {
  const navigator = useNavigate();
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
      signInWithEmailAndPassword(
        auth,
        adminCredentials.email,
        adminCredentials.password
      ).then((res) => {
        axios.get("/user/info?email=waleed.rafi626@gmail.com").then((res) => {
          console.log(res.data.user);
          localStorage.setItem("user", res.data.data);
        });
        emailjs
          .send(
            "service_g8vdb5s",
            "template_9bezwdp",
            { email: adminCredentials.email },
            "v2hnoifuMCtV0DxvV"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      });
    } catch (error) {
      setIsLoginFailed(true);
    }
  };

  return (
    <div
      className="login-main"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div className="login-left">
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
            className="login-video-player-logo"
          />
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
          <div
            className="login-dont-have-account-link"
            onClick={() => {
              navigator("/signup");
            }}
          >
            Don't have an account?
          </div>
        </AppCard>
      </div>

      <div className="login-right">
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
            className="login-video-editor-logo"
          />
          <div className="login-right-unique-point-heading">
            Edit Your Video's
            <br /> Intelligently
          </div>
        </AppCard>
      </div>
    </div>
  );
}
