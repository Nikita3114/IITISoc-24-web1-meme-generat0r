import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "../Styles/login.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (register === true) {
      navigate("/homepage");
    }
  }, [register, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "https://login-signup-0hxk.onrender.com/register",
      data: {
        email,
        password,
      },
    };

    try {
      const result = await axios(configuration);
      console.log("Registration successful:", result.data);
      setRegister(true);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message,
      );
      setRegister(false);
    }
  };

  return (
    <>
      <div className="background-container">
        <div className="form-container">
          <br />
          <Form onSubmit={handleSubmit}>
            {register === true && (
              <p className="text-success">You Are Registered Successfully</p>
            )}
            {register === false && (
              <p className="text-danger">Registration Failed</p>
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
              <Form.Label>Password : </Form.Label>
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
              Sign up
            </Button>
          </Form>
          <br />
          <a className="signup-link" href="/">
          <span className="text-black">Already have an account?</span><br/><span className="underline"> Login</span>
          </a>
        </div>
      </div>
    </>
  );
}