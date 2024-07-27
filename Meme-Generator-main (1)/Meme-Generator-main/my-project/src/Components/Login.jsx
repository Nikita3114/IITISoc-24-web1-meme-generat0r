import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === true) {
      navigate("/homepage");
    }
  }, [loginStatus, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "https://login-signup-0hxk.onrender.com/login",
      data: {
        email,
        password,
      },
    };

    try {
      const result = await axios(configuration);
      console.log("Login successful:", result.data);
      cookies.set("TOKEN", result.data.token, { path: "/" });
      setLoginStatus(true);
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message,
      );
      setLoginStatus(false);
    }
  };

  return (
    <div className="background-container">
      <div className="form-container">
        <br />
        <div>
          <Form onSubmit={handleSubmit}>
            {loginStatus === false && (
              <p className="text-danger">Login Failed</p>
            )}
            {loginStatus === true && (
              <p className="text-success">You Are Logged in Successfully</p>
            )}
             <Form.Group controlId="formBasicEmail">
              <Form.Label>User address : </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type here(eg:user)"
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="form-label">Password : </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <br />
            <Button
              className="button-81"
              role="button"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>
        <br />
        <a href="/signup" className="">
          <span className="text-black font-semibold">Don't have an account?</span><br/> <span className="signup-link underline">Sign up</span>
        </a>
        <br />
      
      </div>
    </div>
  );
}