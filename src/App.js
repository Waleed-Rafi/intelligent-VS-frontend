import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.js";
import axios from "./axios/index";
import Login from "./Screens/Auth/Login/Login";
import SignUp from "./Screens/Auth/Signup/Signup";
import Home from "./Screens/Home/Home";
import ProtectedRoute from "./Screens/Auth/ProtectedRoute/ProtectedRoute";
import "./App.css";
import Studio from "./Screens/Studio/Studio.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (isInitialRender) {
          setIsInitialRender(false);
          setLoggedInUser(() => user);
        }
        addUserTokenToHeaders(user);
        setInterval(function () {
          addUserTokenToHeaders(user); // refreshing the token (token always expire in 60 mins)
        }, 3000000); // 61 mins = 3660000 milliseconds
      }
    });
  }, []);

  const addUserTokenToHeaders = (user) => {
    user.getIdToken(true).then((token) => {
      axios.defaults.headers.common["Authorization"] = token; // common is used for all requests, we can use get, post
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            exact
            element={!loggedInUser?.email ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            exact
            element={!loggedInUser?.email ? <SignUp /> : <Navigate to="/" />}
          />

          <Route
            path="/"
            exact
            element={
              <ProtectedRoute auth={loggedInUser?.email ? true : false}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studio"
            exact
            element={
              <ProtectedRoute auth={loggedInUser?.email ? true : false}>
                <Studio />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
