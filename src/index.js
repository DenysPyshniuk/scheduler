import React from "react";
import { createRoot } from "react-dom/client";

import "index.css";

import Application from "components/Application";
import axios from "axios";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Application />);
