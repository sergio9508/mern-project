const userController = {};

const User = require("../models/user");

userController.getUsers = async (req, res) => {
  let Users = await User.find();
  res.json(Users);
};

userController.createUser = async (req, res) => {
  let User = req.body;
  let newUser = User({
    User: User.User,
    description: User.description,
  });
  await newUser.save();
  res.json({ message: "Note Saved" });
};

userController.getUser = async (req, res) =>{
  let id = req.params.id;
  let User = await User.findById(id);
  res.json(User);
}

module.exports = userController;
