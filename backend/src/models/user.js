const { Schema, model } = require("mongoose");

const Task = new Schema({
  name: String,
  last_name: String,
  birthdate: Date,
});

module.exports = model("Task", Task);
