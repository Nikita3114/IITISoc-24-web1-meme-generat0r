import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "../../public/login.css";
import Footer from "./Footer";
import ProfilePicContext from "./ProfilePicContext";

const Login = () => {
  const navigate = useNavigate();
  const chosenProfilePic = useContext(ProfilePicContext);

  const handleContinueClick = () => {
    navigate("/homepage");
  };
  
  useEffect(() => {
    const spanElement = document.querySelector("span");
    if (spanElement) {
      spanElement.classList.remove("text-body-secondary");
    }
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div className="profilePic">
          {chosenProfilePic && (
            <img src={chosenProfilePic.url} alt="profilePic" />
          )}
        </div>
        <div className="username">
          <input
            type="search"
            className="form-control"
            placeholder="Nickname"
            aria-label="Search"
          />
          <button
            className="btn btn-primary d-inline-flex align-items-center btn-dark"
            type="button"
            onClick={handleContinueClick}
          >
            Continue
            <svg className="bi ms-1" width="90" height="1">
              <use xlinkHref="#arrow-right-short"></use>
            </svg>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default Login;
