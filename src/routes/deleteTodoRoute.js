const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const { id } = req.params;
  await TodoModel.findByIdAndDelete(id);
  res.status(204).send("Done");
}