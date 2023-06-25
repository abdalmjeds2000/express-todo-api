const TodoModel = require('../models/TodoModel');
const jwtDecode = require('jwt-decode');


module.exports = async (req, res) => {
  const payload = { Title, Description, Priority } = req.body;
  payload.CreatedAt = new Date();
  payload.UpdatedAt = new Date();
  payload.IsCompleted = false;
  const token = req.headers.authorization.split(" ")[1];
  const { id } = jwtDecode(token);
  payload.creatorId = id;

  const newTodo = new TodoModel(payload);
  await newTodo.save();

  res.json(newTodo);
}