const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const { id } = req.params;
  let todo = await TodoModel.findById(id);
  if(req.body.Title) todo.Title = req.body.Title;
  if(req.body.Description) todo.Description = req.body.Description;
  if(req.body.Priority) todo.Priority = req.body.Priority;
  if(req.body.IsCompleted) todo.IsCompleted = req.body.IsCompleted;
  todo.UpdatedAt = new Date();
  await todo.save();
  res.json(todo);
}