/* eslint-disable no-unused-vars */

import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
// import Logo from './logo5.png';
import React, { useContext } from "react";
import { UserContext } from "../App";
import "../Css/navbar.css";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const Render = () => {
    if (state) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/aboutt">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contactt">
              Contact
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/loginn">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signn">
              Registration
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      {/* navbar class to fixed top = fixed-top */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/">
            <h1 className="nav-title">MERN-X</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Render />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
