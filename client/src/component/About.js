/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useContext } from "react";
import logo from "./logo5.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../Css/about.css";
import { UserContext } from "../App";

const About = () => {
  const { state, dispatch } = useContext(UserContext);

  let token = Cookies.get("jwtoken");
  const [user, setUser] = useState({});

  // console.log(`my cookis ${typeof(token)}  + ${token} `);

  const navigate = useNavigate();
  const callAboutPage = async () => {
    try {
      if (token) {
        var headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        };
      } else {
        headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
      }
      const res = await fetch(
        "https://smiling-frog-earrings.cyclic.app//about",
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await res.json();
      console.log(data);
      setUser(data.name);
      dispatch({ type: "USER", payload: true });

      if (res.status === 401) {
        navigate("/login");

        throw new Error("error");
      }
    } catch (e) {
      console.log(`dekh ye error hai ${e}`);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="cont">
        <div className="parent1">
          <div className="child1">
            <div className="img1">
              <img src={logo} alt="" className="img1" />
            </div>
          </div>
          <div className="child2">
            <div className="heading">
              <h1 className="head-shadow">Mern Developer</h1>
            </div>
            <div className="info">
              <div className="abo">
                <ul>
                  <li>Name :</li>
                  <li>Work :</li>
                  <li>Gmail :</li>
                  <li>Phone :</li>
                </ul>
              </div>
              <div className="res">
                <ul>
                  <li> {user.name} </li>
                  <li> {user.work}</li>
                  <li> {user.email}</li>
                  <li> {user.phone}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
