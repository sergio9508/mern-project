import React, { useRef } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  Button,
  Schema,
  Input,
} from "rsuite";
import { useState } from "react";

const { StringType, NumberType, DateType } = Schema.Types;

const model = Schema.Model({
  nombre_1: StringType().isRequired("Nombre es requerido"),
  nombre_2: StringType().isRequired("Nombre es requerido"),
  apellido_1: StringType().isRequired("Nombre es requerido"),
  apellido_2: StringType().isRequired("Nombre es requerido"),
  apellido_casada: StringType(),
  genero: NumberType(),
  DUI: StringType().addRule((value) => {
    if (value.length < 10) {
      return false;
    } else {
      let digito = parseInt(value.charAt(9));
      let suma =
        9 * parseInt(value.charAt(0)) +
        8 * parseInt(value.charAt(1)) +
        7 * parseInt(value.charAt(2)) +
        6 * parseInt(value.charAt(3)) +
        5 * parseInt(value.charAt(4)) +
        4 * parseInt(value.charAt(5)) +
        3 * parseInt(value.charAt(6)) +
        2 * parseInt(value.charAt(7));
      let division = suma % 10;
      let resta = 10 - division;
      return resta === digito;
    }
  }, "Dui invalido"),
  NIT: StringType().addRule((cadena) => {
    var calculo = 0;
    var digitos = parseInt(cadena.substring(12, 15));
    var resultado;
    if (digitos <= 100) {
      for (var posicion = 0; posicion <= 14; posicion++) {
        {
          if (!(posicion === 4 || posicion === 11)) {
            calculo += 14 * parseInt(cadena.charAt(posicion));
          }
          calculo = calculo % 11;
        }
      }
    } else {
      var n = 1;
      for (var posicion = 0; posicion <= 14; posicion++) {
        {
          if (!(posicion === 4 || posicion === 11)) {
            calculo =
              (calculo +
                parseInt(cadena.charAt(posicion)) *
                  (3 + 6 * Math.floor(Math.abs(((n + 4) / 6) | 0)) - n)) |
              0;
            n++;
          }
        }
      }
      calculo = calculo % 11;
      if (calculo > 1) {
        calculo = 11 - calculo;
      } else {
        calculo = 0;
      }
    }
    resultado = calculo === parseInt(cadena.charAt(16));
    return resultado;
  }, "Nit no es valido"),
  telefono: StringType().isRequired("Telefono es requerido"),
  fecha_nacimiento: DateType().isRequired("fecha de nacimiento es requerida"),
  direccion: StringType().isRequired("Direccion es requerida"),
  email: StringType()
    .isEmail("Correo ivalido")
    .isRequired("Correo es requerido"),
});

export default function FormUser() {
  const [formValue, setFormValue] = useState({
    name_1: "",
    name_2: "",
    apellido_1: "",
    apellido_2: "",
    apellido_casada: "",
    genero: "",
    DUI: "",
    NIT: "",
    fecha_nacimiento: "",
    telefono: "",
    direccion: "",
    email: "",
  });
  const [formError, setFormError] = useState({});
  const [age, setAge] = useState(0);
  let form = useRef(null);

  function onSubmit() {
    if (!form.check()) {
      console.log();
    }
    console.log(formValue);
  }

  return (
    <div className="container">
      <h1>Registrar Usuario</h1>
      <div className="form">
        <Form
          fluid
          formValue={formValue}
          onChange={(formValue) => setFormValue(formValue)}
          ref={form}
          formError={formError}
          onCheck={(formError) => setFormError(formError)}
          model={model}
        >
          <FormGroup>
            <ControlLabel>Nombre 1</ControlLabel>
            <FormControl name="name_1" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Nombre 2</ControlLabel>
            <FormControl name="name_2" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Appelido 1</ControlLabel>
            <FormControl name="apellido_1" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Apellido 2</ControlLabel>
            <FormControl name="apellido_2" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Apellido de casada</ControlLabel>
            <FormControl name="apellido_casada" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Genero</ControlLabel>
            <FormControl name="genero" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Fecha de Nacimiento</ControlLabel>
            <FormControl name="fecha_nacimiento" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>DUI</ControlLabel>
            <FormControl name="DUI" accepter={Input} maxLength={10} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>NIT</ControlLabel>
            <FormControl name="NIT" maxLength={17} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Teléfono</ControlLabel>
            <FormControl name="telefono" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Dirección</ControlLabel>
            <FormControl name="direccion" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" />
          </FormGroup>

          <FormGroup>
            <ButtonToolbar>
              <Button appearance="primary" color="green">
                Submit
              </Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
