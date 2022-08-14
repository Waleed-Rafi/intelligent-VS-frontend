import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

// instance.defaults.headers.common["Authorization"] = config.allRequestsSecret; // common is used for all requests, we can use get, post
// authorization token is set inside app.js file
instance.defaults.headers.common["Content-Type"] = "application/json";

export default instance;
