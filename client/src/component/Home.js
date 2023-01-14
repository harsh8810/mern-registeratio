/* eslint-disable no-unused-vars */

import "../Css/Home.css";
import React, { useContext } from "react";
import { UserContext } from "../App";
import Cookies from "js-cookie";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const token = Cookies.get("jwtoken");
  if (token) {
    dispatch({ type: "USER", payload: true });
  } else {
    dispatch({ type: "USER", payload: false });
  }

  return (
    <>
      <div className="center">
        <div className="left">
          <h1>Welcome To MERN-X</h1>
          <p className="paragragh">
            "MERN-X" is a website that aims to teach students the skills they
            need to become proficient in MERN (MongoDB, Express, React, and
            Node.js) stack development.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
