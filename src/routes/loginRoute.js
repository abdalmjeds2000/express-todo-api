const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const UserModel = require('../models/UserModel');

module.exports = async (req, res) => {
  const {username, password} = req.body;
  const user = await UserModel.findOne({ username });
  !user && res.status(200).send({ status: "error", message: "User doesn't Exist!"});

  const isPasswordValid = await bcrypt.compare(password, user.password);
  !isPasswordValid && res.status(200).send({ status: "error", message: "Username or Password Wrong!" });
  
  const token = jwt.sign({
    id: user._id, 
    fullname:user.fullname, 
    username: user.username, 
    email: user.mail, 
    country: user.country, 
    phone: user.phone, 
    IsAdmin: user.IsAdmin,
    age: user.age,
  }, secret);
  return res.status(200).send({ status: "success", message: `Welcome ${username}`, token, userID: user._id});
}