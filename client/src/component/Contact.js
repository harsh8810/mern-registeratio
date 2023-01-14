/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import "../Css/Contact.css";
import Logo from "./fb.png";
import Logo1 from "./insta.png";
import Twit from "./twitter.png";
import Yout from "./linkedin-png-5847.png";
import { UserContext } from "../App";

const Contact = () => {
  const { state, dispatch } = useContext(UserContext);

  let token = Cookies.get("jwtoken");
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // console.log(`my cookis ${typeof(token)}  + ${token} `);

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
        "https://smiling-frog-earrings.cyclic.app/about",
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await res.json();
      // console.log(data);
      setUser({
        ...user,
        name: data.name.name,
        email: data.name.email,
        phone: data.name.phone,
      });
      dispatch({ type: "USER", payload: true });

      if (res.status === 401) {
        throw new Error("error");
      }
    } catch (e) {
      // console.log(`dekh ye error hai ${e}`);
    }
  };

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
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

    const { name, email, phone, message } = user;
    try {
      const res = await fetch(
        "https://smiling-frog-earrings.cyclic.app/contact",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
          }),
        }
      );

      const data = await res.json();
      // console.log(`here is contact data ${data}`);

      if (res.status === 400) {
        // console.log("message not send");
      } else {
        // console.log("message sent successfully");
        alert("message sent successfully");
        setUser({ ...user, message: "" });
      }
    } catch (e) {
      // console.log(`here is the error is contact ${e}`)
    }
  };
  return (
    <>
      <div className="container">
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
            <p className="text">
              {" "}
              Contact us with the following details. and fillup the form with
              the details.{" "}
            </p>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                {" "}
                <a href="/">
                  {" "}
                  <i className="fa fa-facebook-f">
                    <img src={Logo} alt="" className="img-logo" />
                  </i>{" "}
                </a>{" "}
                <a href="/">
                  {" "}
                  <i className="fa fa-twitter">
                    <img src={Twit} alt="" className="img-logo" />
                  </i>{" "}
                </a>{" "}
                <a href="/">
                  {" "}
                  <i className="fa fa-instagram">
                    <img src={Logo1} alt="" className="img-logo" />
                  </i>{" "}
                </a>{" "}
                <a href="/">
                  {" "}
                  <i className="fa fa-linkedin">
                    <img src={Yout} alt="" className="img-logo" />
                  </i>{" "}
                </a>{" "}
              </div>
            </div>
          </div>
          <div className="contact-info-form">
            {" "}
            <span className="circle one"></span>{" "}
            <span className="circle two"></span>
            <form method="POST">
              <h3 className="title">Contact us</h3>
              <div className="social-input-containers">
                {" "}
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Name"
                  value={user.name}
                  onChange={handleInput}
                />{" "}
              </div>
              <div className="social-input-containers">
                {" "}
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleInput}
                />{" "}
              </div>
              <div className="social-input-containers">
                {" "}
                <input
                  type="tel"
                  name="phone"
                  className="input"
                  placeholder="Phone"
                  value={user.phone}
                  onChange={handleInput}
                />{" "}
              </div>
              <div className="social-input-containers textarea">
                {" "}
                <textarea
                  name="message"
                  className="input"
                  placeholder="Message"
                  value={user.message}
                  onChange={handleInput}
                ></textarea>{" "}
              </div>{" "}
              <button type="submit" onClick={sendMessage} className="btn">
                Send..
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
