const { Schema, model } = require("mongoose");

const User = new Schema({
  name_1: String,
  name_2: String,
  apellido_1: String,
  apellido_2: String, 
  apellido_casada: String, 
  genero: String, 
  DUI: String,
  NIT: String,
  fecha_nacimiento: Date,
  telefono: String,
  direccion: String,
  email: String,
  mayor_edad: Boolean,
  nombre_completo: String
});

module.exports = model("User", User);
