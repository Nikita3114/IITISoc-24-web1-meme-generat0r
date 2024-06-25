import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./Components/App";
import ProfilePicContext, {
  ProfilePicProvider,
} from "./Components/ProfilePicContext";

ReactDOM.render(
  <BrowserRouter>
    <ProfilePicProvider>
      <App />
    </ProfilePicProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
