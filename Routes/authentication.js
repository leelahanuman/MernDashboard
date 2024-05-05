const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




router.post("/register", async (req, res) => {
  const { username,  password} = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "You have not entered required fields" });
  }

  const checkUser = await User.find({ username});
  if (checkUser.length!==0) {
    res.status(401).json({ message: "User with email already exists" });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createUser = await User.create({
   
    username,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      username,
      
    },
    process.env.SECRET_KEY
  );
  res.status(201).json({token})
});
//login 
router.post("/login", async (req, res) => {
  const {username,password} = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "You have not entered required fields" });
  }
  const findUser = await User.findOne({ username});
  if (!findUser) {
    res.status(401).json({ message: "Invalid login credentials" });
    return;
  }
  const compareUserPassword = await bcrypt.compare(password,findUser.password)
  if(compareUserPassword === false){
    res.status(400).json({ message: "Invalid login credentials" });
    return;
  }
  const token = jwt.sign(
    {

        username:findUser.username,
    
    
    },
    process.env.SECRET_KEY
  );
  res.status(201).json({ token });

});

// getting user 
router.get("/getuser", async (req, res) => {

  const token=req.headers.authtoken;

  const user=jwt.decode(token,process.env.SECRET_KEY);


 res.status(200).json({ user });


  
 })




module.exports = router;
