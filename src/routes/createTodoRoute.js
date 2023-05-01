const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const { Title, Description, Priority, IsCompleted } = req.body;
  const payload = { Title, Description, Priority, IsCompleted };
  payload.CreatedAt = new Date();
  payload.UpdatedAt = new Date();

  const newTodo = new TodoModel(payload)
  await newTodo.save();

  res.json(newTodo);
}