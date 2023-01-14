/* eslint-disable no-unused-vars */

import React, { useContext, useState } from "react";
import logo from "./logo1.webp";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "../Css/login.css";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  // eslint-disable-next-line
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendData = async (e) => {
    e.preventDefault();
    // const url = process.env.REACT_APP_API_URL;

    try {
      const res = await fetch(
        `https://smiling-frog-earrings.cyclic.app/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,

            password,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 400 || !email || !password) {
        window.alert("invalid credentials");
        // console.log("invalid credentials");
      } else if (res.status === 200) {
        const token = JSON.stringify(data.token);
        // console.log(`here is my token ${token}`);

        // console.log(JSON.stringify(data) + "hello");
        window.alert("Login sucessfull");

        Cookies.set("jwtoken", token);
        dispatch({ type: "USER", payload: true });

        

        // console.log("registration sucessfull");
        history("/");
      }
    } catch (e) {
      // console.log("error" + e);
    }
  };
  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5 mdevice">
              <img src={logo} className="img-fluid img" alt="Sample file" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form method="POST" className="formEdit">
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center"></div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    id="btn1"
                    onClick={sendData}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/signn" className="link-danger">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
