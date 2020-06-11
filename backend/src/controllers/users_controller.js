const userController = {};

const User = require("../models/user");

userController.getUsers = async (req, res) => {
  let users = await User.find();
  res.json(users);
};

userController.createUser = async (req, res) => {
  let user = req.body;
  console.log(user);
  
  let newUser = User({
    name_1: user.name_1,
    name_2: user.name_2,
    apellido_1: user.apellido_1,
    apellido_2: user.apellido_2,
    apellido_casada: user.apellido_casada,
    genero: user.genero,
    DUI: user.DUI,
    NIT: user.NIT,
    fecha_nacimiento: user.fecha_nacimiento,
    telefono: user.telefono,
    direccion: user.direccion,
    email: user.email,
    mayor_edad: user.mayor_edad,
    nombre_completo: user.nombre_completo,
  });
  await newUser.save();
  res.json({ message: "User Saved" });
};

userController.getUser = async (req, res) =>{
  let id = req.params.id;
  let User = await User.findById(id);
  res.json(User);
}

module.exports = userController;
