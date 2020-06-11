import React, { useRef, Fragment, useEffect } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar,
  Button,
  Schema,
  Input,
  DatePicker,
  Alert,
  SelectPicker,
} from "rsuite";
import { useState } from "react";
import moment from "moment";
import { postUser, cleanUser } from "redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

const { StringType, NumberType, DateType, BooleanType } = Schema.Types;

export default function FormUser() {
  const [formValue, setFormValue] = useState({
    nombre_1: "",
    nombre_2: "",
    apellido_1: "",
    apellido_2: "",
    apellido_casada: "",
    genero: "",
    DUI: "",
    NIT: "",
    fecha_nacimiento: new Date(),
    telefono: "",
    direccion: "",
    email: "",
    mayor_edad: false,
    nombre_completo: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      dispatch(cleanUser());
      alert("salu");
    };
  }, [dispatch]);

  const [gender] = useState([
    { value: 1, label: "Maculino" },
    { value: 2, label: "Femenino" },
  ]);

  const [formError, setFormError] = useState({});

  const [age, setAge] = useState(0);

  let form = useRef(null);

  const model = Schema.Model({
    nombre_1: StringType().isRequired("Nombre es requerido"),
    nombre_2: StringType().isRequired("Nombre es requerido"),
    apellido_1: StringType().isRequired("Nombre es requerido"),
    apellido_2: StringType().isRequired("Nombre es requerido"),
    apellido_casada: StringType(),
    genero: NumberType(),
    DUI:
      age > 18
        ? StringType()
            .isRequired("Dui es requerido")
            .addRule((value) => {
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
            }, "Dui invalido")
        : StringType(),
    NIT:
      age >= 18
        ? StringType()
            .isRequired("NIT es requerido")
            .addRule((cadena) => {
              var calculo = 0;
              var digitos = parseInt(cadena.substring(12, 15));
              var resultado;
              if (digitos <= 100) {
                for (let posicion = 0; posicion <= 14; posicion++) {
                  {
                    if (!(posicion === 4 || posicion === 11)) {
                      calculo += 14 * parseInt(cadena.charAt(posicion));
                    }
                    calculo = calculo % 11;
                  }
                }
              } else {
                var n = 1;
                for (let posicion = 0; posicion <= 14; posicion++) {
                  {
                    if (!(posicion === 4 || posicion === 11)) {
                      calculo =
                        (calculo +
                          parseInt(cadena.charAt(posicion)) *
                            (3 +
                              6 * Math.floor(Math.abs(((n + 4) / 6) | 0)) -
                              n)) |
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
            }, "Nit no es valido")
        : StringType(),
    telefono: StringType().isRequired("Telefono es requerido"),
    fecha_nacimiento: DateType().isRequired("fecha de nacimiento es requerida"),
    direccion: StringType().isRequired("Direccion es requerida"),
    email: StringType()
      .isEmail("Correo invalido")
      .isRequired("Correo es requerido"),
    mayor_edad: BooleanType(),
    nombre_completo: StringType(),
  });

  function onSubmit() {
    if (!form.check()) {
      Alert.error("Algunos datos no son validos.", 5000);
      console.log(formError);
      return;
    }
    let saludo = `${formValue.nombre_1} ${formValue.nombre_2} ${formValue.apellido_1} ${formValue.apellido_2}`;
    let usuario = formValue;
    if (age < 35 && formValue.genero === 1) {
      usuario.nombre_completo = `Joven ${saludo}`;
    } else if (formValue.genero === 2 && formValue.apellido_casada === "") {
      usuario.nombre_completo = `Joven ${saludo}`;
    } else if (age >= 35 && formValue.genero === 1) {
      usuario.nombre_completo = `Joven ${saludo}`;
    } else if (formValue.genero === 2 && formValue.apellido_casada.length > 0) {
      usuario.nombre_completo = `Joven ${saludo}`;
    }
    setFormValue(usuario);
    dispatch(postUser(usuario));
    if (user.success) {
      Alert.info(usuario.nombre_completo);
      usuario = {
        nombre_1: "",
        nombre_2: "",
        apellido_1: "",
        apellido_2: "",
        apellido_casada: "",
        genero: "",
        DUI: "",
        NIT: "",
        fecha_nacimiento: new Date(),
        telefono: "",
        direccion: "",
        email: "",
        mayor_edad: false,
        nombre_completo: "",
      };
      setFormValue(usuario);
    }
  }

  function calcAge(date) {
    // console.log(age);
    let edad = moment().diff(moment(date), "years");
    if (edad >= 18) {
      let usuario = formValue;
      usuario.mayor_edad = true;
      setFormValue(usuario);
    }
    setAge(edad);
  }

  return (
    <div className="container">
      <h1>Registrar Usuario</h1>
      <div className="form">
        <Form
          fluid
          formValue={formValue}
          onChange={(formValue) => setFormValue(formValue)}
          ref={(ref) => (form = ref)}
          onCheck={(formError) => setFormError(formError)}
          model={model}
        >
          <FormGroup>
            <ControlLabel>Nombre 1</ControlLabel>
            <FormControl name="nombre_1" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Nombre 2</ControlLabel>
            <FormControl name="nombre_2" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Apellido 1</ControlLabel>
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
            <FormControl
              name="genero"
              accepter={SelectPicker}
              block
              data={gender}
              searchable={false}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Fecha de Nacimiento</ControlLabel>
            <FormControl
              name="fecha_nacimiento"
              accepter={DatePicker}
              block
              oneTap
              onChange={(value) => calcAge(value)}
            />
          </FormGroup>
          {age >= 18 ? (
            <Fragment>
              <FormGroup>
                <ControlLabel>DUI</ControlLabel>
                <FormControl name="DUI" accepter={Input} maxLength={10} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>NIT</ControlLabel>
                <FormControl name="NIT" maxLength={17} />
              </FormGroup>
            </Fragment>
          ) : null}
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
              <Button appearance="primary" color="green" onClick={onSubmit}>
                Submit
              </Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
