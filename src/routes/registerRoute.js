const bcrypt = require("bcrypt");
const UserModel = require('../models/UserModel');

module.exports = async (req, res) => {
  const {fullname, username, mail, age, phone, country, password} = req.body;
  const user = await UserModel.findOne({ username });
  user && res.json({ message: "User Already Exist!" })

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new UserModel({ fullname, username, mail, age, phone, country, password: hashedPassword });
  await newUser.save();

  return res.json({ status: 200, message: "user added successfully!", /* data: newUser */});
}