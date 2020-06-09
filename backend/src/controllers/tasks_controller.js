const taskController = {};

const Task = require("../models/task");

taskController.getTasks = async (req, res) => {
  let tasks = await Task.find();
  res.json(tasks);
};

taskController.createTask = async (req, res) => {
  let task = req.body;
  let newTAsk = Task({
    task: task.task,
    description: task.description,
  });
  await newTAsk.save();
  res.json({ message: "Note Saved" });
};

taskController.getTask = async (req, res) =>{
  let id = req.params.id;
  let task = await Task.findById(id);
  res.json(task);
}

module.exports = taskController;
