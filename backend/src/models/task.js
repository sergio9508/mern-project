const { Schema, model } = require("mongoose");

const Task = new Schema({
  task: String,
  date: { type: Date, default: Date.now },
  description: String,
});

module.exports = model("Task", Task);
