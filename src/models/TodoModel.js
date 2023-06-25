const { model, Schema } = require("mongoose");


const TaskSchema = new Schema({
  Title: {
    type: String,
    required: true, 
    maxLength: 255
  },
  Description: {
    type: String,
    maxLength: 4000
  },
  Priority: {
    type: Number,
    maxLength: 1
  },
  IsCompleted: {
    type: Boolean,
    required: true, 
  },
  CreatedAt: {
    type: Date,
  },
  CreatedAt: {
    type: Date,
  },
  UpdatedAt: {
    type: Date,
  },
  creatorId: {
    type: String,
    required: true, 
  },
});

const TaskModel = model("tasks", TaskSchema);
module.exports = TaskModel;
