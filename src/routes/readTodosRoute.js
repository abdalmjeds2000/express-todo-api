const TodoModel = require('../models/TodoModel');
const jwtDecode = require('jwt-decode');

module.exports = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const { id } = jwtDecode(token);
  const todos = await TodoModel.find({ creatorId: id });
  res.json(todos);
}