/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../App";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useNavigate();


  const clearCookie = () => {
    // const flag = confirm(`are you sure want to logout?`);
    if (window.confirm(`are you sure want to logout?`)) {
      Cookies.remove("jwtoken");
      dispatch({ type: "USER", payload: false });

      history("/");
    }
    
  }

  useEffect(() => {
    clearCookie();
    // eslint-disable-next-line
  }, []);
  return <div></div>;
};

export default Logout;
