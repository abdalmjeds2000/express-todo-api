const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);


const username = process.env.USERNAME,
      password = process.env.PASSWORD,
      db = process.env.DB,
      port = process.env.PORT;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.uoup6yr.mongodb.net/${db}?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Server Run!");
    app.listen(port);
  });

