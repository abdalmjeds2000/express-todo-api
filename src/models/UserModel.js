const { model, Schema } = require("mongoose");


const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true, 
    maxLength: 255
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 100
  },
  IsAdmin: {
    type: Boolean,
  },
  mail: {
    type: String,
    maxLength: 125
  },
  age: {
    type: Number,
  },
  phone: {
    type: String,
    maxLength: 25
  },
  country: {
    type: String,
    maxLength: 125
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 60
  },
});

const UserModel = model("users", UserSchema);
module.exports = UserModel;
