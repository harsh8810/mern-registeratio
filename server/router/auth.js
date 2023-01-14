const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
require("../DB/conn");

// router.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });



router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: " pura fill karo " });
  }

  try {
    const userexist = await User.findOne({ email: email });
    if (userexist) {
      return res.status(422).json({ error: "email already exist" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });

    const userRegister = await user.save();

    if (userRegister) {
      console.log("register hit");

      return res.status(201).json({ message: "success" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "pls filled the data" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatched = await bcrypt.compare(password, userLogin.password);

      if (!isMatched) {
        return res.status(400).json({ error: "pls filled the correct pass" });
      } else {
        console.log("login success");
        token = await userLogin.generateAuthToken();
        console.log(`Login - ${typeof token} === ${token}`);

        return res.status(200).send({
          message: "haan sahi hai",
          token,
        });
      }
    } else {
      res.status(400).json({ error: "invalid" });
    }
  } catch (e) {
    console.log("error hai bahi");
    res.json({ error: "nhi hua" });
  }
});

router.get("/about", authenticate, (req, res) => {
  res.status(200).json({
    name: req.user,
  });
});

router.get("/getdata", authenticate, (req, res) => {
  res.status(200).json({
    name: req.user,
  });
});

router.post("/contact", authenticate, async(req, res) => {
  try{
      const{name,email,phone,message}=req.body;

      if(!name || !email || !phone || !message){
        console.log(`fill all the fields`);
        return res.json({ error : "plz filled the contact form"});
      }

      const userContact = await User.findOne({email})
      console.log(`here is id ${email}`);
      // console.log(`here is user ${userContact}`);

      if(userContact){
        const usermessage = await userContact.addmes(name,email,phone,message);
        await userContact.save();

        res.status(201).json({message:"user contact successfully"})


      }
  }
  catch(e){
    console.log(`this is error in contact route ${e}`);
  }
});



module.exports = router;
