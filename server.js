const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());


const username = process.env.USERNAME,
      password = process.env.PASSWORD,
      db = process.env.DB,
      port = process.env.PORT,
      secret = process.env.SECRET;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.uoup6yr.mongodb.net/${db}?retryWrites=true&w=majority`);

const UserModel = require('./models/UserModel');
app.post("/todos/register", async(req, res) => {
  const {fullname, username, mail, age, phone, country, password} = req.body;
  const user = await UserModel.findOne({ username });
  user && res.json({ message: "User Already Exist!" })

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new UserModel({ fullname, username, mail, age, phone, country, password: hashedPassword });
  await newUser.save();

  return res.json({ status: 200, message: "user added successfully!", data: newUser});
});

app.post("/todos/login", async(req, res) => {
  const {username, password} = req.body;
  const user = await UserModel.findOne({ username });
  !user && res.status(200).send({ status: "error", message: "User doesn't Exist!"});

  const isPasswordValid = await bcrypt.compare(password, user.password);
  !isPasswordValid && res.status(200).send({ status: "error", message: "Username or Password Wrong!" });

  const token = jwt.sign({id: user._id, IsAdmin: user.IsAdmin}, secret);
  return res.status(200).send({ status: "success", message: `Welcome ${username}`, token, userID: user._id});
});


app.get("/todos", async (req, res) => {
  
  res.json("[1,2,3,4]");
});






// const verify = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if(authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, secret, (err, payload) => {
//       if(err) {
//         return res.status(403).json({ message: "Token is not valid!" })
//       }

//       req.user = payload;
//       next();
//     })
//   } else {
//     return res.status(401).json({ status: "You are not authenticated!" })
//   }
// };


// app.delete("/todos/users/:userId", verify, async (req, res) => {
//   if(req.user.id === req.params.userId || req.user.IsAdmin) {
//     await UserModel.deleteOne({ _id: req.params.userId })
//     return res.status(200).json({ message: "User has been Deleted!" })
//   }
//   res.json("error");
// });



const TaskModel = require('./models/TaskModel');




app.listen(port, () => {
  console.log("Server Run!");
})