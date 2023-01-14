import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link , useNavigate} from "react-router-dom";
import "../Css/Regis.css";

const Sign = () => {
  const history = useNavigate();
  const[user,setUser]= useState(
    {name:"",email:"",phone:"",work:"", password:"",cpassword:""}
  );
  let name,value;
  const handleInp = (e)=>{
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value});
    
  }

  

  const postData =async(e)=>{
    if (user.password !== user.cpassword) {
      // console.log("password and confirm are not matching");
      alert("password and confirm are not matching");
      return history("/sign");
    } else {
      e.preventDefault();
      const { name, email, phone, work, password, cpassword } = user;
      const res = await fetch(
        "https://smiling-frog-earrings.cyclic.app/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            work,
            password,
            cpassword,
          }),
        }
      );

      await res.json();

      if (res.status === 422) {
        window.alert("invalid credentials");
        // console.log("invalid credentials");
      } else {
        window.alert("registration sucessfull");
        // console.log("registration sucessfull");
        history("/loginn");
      }
    }
  }
  

  

  return (
    <>
      <div className="wrapper">
        <div className="form-left">
          <h2 className="text-uppercase">information</h2>
          <p>
            "MERN-X" is a website that aims to teach students the skills they
            need to become proficient in MERN (MongoDB, Express, React, and
            Node.js) stack development. The MERN stack is a popular technology
            stack used for building modern web applications, and it combines the
            power of four different technologies to create a seamless
            development experience. The website likely offers a range of
            resources and tutorials, such as video lessons, code examples, and
            exercises, to help students learn about each of the technologies in
            the MERN stack and how to use them together to build full-stack web
            applications. Whether you're a beginner looking to learn MERN
            development from scratch or an experienced developer looking to
            expand your skillset, "MERN-X" is a valuable resource for anyone
            interested in this exciting field.
          </p>
          <div className="form-field" id="login">
            <Link to="/loginn" id="change">
              Already have an account?
            </Link>
            {/* <input type="submit"  className="account" value="Have an Account?"/> */}
          </div>
        </div>
        <form className="form-right" method="POST">
          <h2 className="text-uppercase">Registration form</h2>
          <div className="row">
            <div className="mb-3">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                id="first_name"
                className="input-field"
                value={user.name}
                onChange={handleInp}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Your Email</label>
            <input
              type="email"
              className="input-field"
              name="email"
              required
              value={user.email}
              onChange={handleInp}
            />
          </div>
          <div className="mb-3">
            <label>Your Phone Number</label>
            <input
              type="number"
              className="input-field"
              name="phone"
              required
              value={user.phone}
              onChange={handleInp}
            />
          </div>
          <div className="mb-3">
            <label>Your Profession</label>
            <input
              type="text"
              className="input-field"
              name="work"
              required
              value={user.work}
              onChange={handleInp}
            />
          </div>
          <div className="row">
            <div className="col-sm-6 mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="pwd"
                className="input-field"
                value={user.password}
                onChange={handleInp}
              />
            </div>
            <div className="col-sm-6 mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                id="cpwd"
                className="input-field"
                value={user.cpassword}
                onChange={handleInp}
              />
            </div>
          </div>

          <div className="form-field">
            <input
              type="submit"
              // disabled={user.password !== user.cpassword }
              // value="register"
              onClick={postData}
              className="register"
              name="register"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Sign
