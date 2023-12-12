const validations = (input) => {
  let errors = {};
  //   console.log(input);
  if (input.primer_nombre) {
    if (contentNumber(input.primer_nombre))
      errors.primer_nombre = "El nombre no puede contener numeros";
    if (notSpaces(input.primer_nombre))
      errors.primer_nombre = "El nombre no puede contener espacios";
  }

  if (input.segundo_nombre) {
    if (contentNumber(input.segundo_nombre))
      errors.segundo_nombre = "El nombre no puede contener numeros";
    if (notSpaces(input.segundo_nombre))
      errors.segundo_nombre = "El nombre no puede contener espacios";

    if (!input.primer_nombre)
      errors.primer_nombre = "El campo no puede estar vacio";
  }

  if (input.primer_apellido) {
    if (contentNumber(input.primer_apellido))
      errors.primer_apellido = "El nombre no puede contener numeros";
    if (notSpaces(input.primer_apellido))
      errors.primer_apellido = "El nombre no puede contener espacios";

    if (!input.primer_nombre)
      errors.primer_nombre = "El campo no puede estar vacio";
    if (!input.segundo_nombre)
      errors.segundo_nombre = "El campo no puede estar vacio";
  }

  if (input.segundo_apellido) {
    if (contentNumber(input.segundo_apellido))
      errors.segundo_apellido = "El nombre no puede contener numeros";
    if (notSpaces(input.segundo_apellido))
      errors.segundo_apellido = "El nombre no puede contener espacios";

    if (!input.primer_nombre)
      errors.primer_nombre = "El campo no puede estar vacio";
    if (!input.segundo_nombre)
      errors.segundo_nombre = "El campo no puede estar vacio";
    if (!input.primer_apellido)
      errors.primer_apellido = "El nombre no puede contener numeros";
  }

  if (input.tipo_documento) {
    if (!input.primer_nombre)
      errors.primer_nombre = "El campo no puede estar vacio";
    if (!input.segundo_nombre)
      errors.segundo_nombre = "El campo no puede estar vacio";
    if (!input.primer_apellido)
      errors.primer_apellido = "El nombre no puede contener numeros";
    if (!input.segundo_apellido)
      errors.segundo_apellido = "El nombre no puede contener numeros";
  }

  if (input.numero_documento) {
    //como al escribir una letra en el input se rompe (no contiene ningun dato), no funciona
    if (contentLetter(input.numero_documento))
      errors.numero_documento =
        "El numero de documento no puede contener numeros";

    if (!input.primer_nombre)
      errors.primer_nombre = "El campo no puede estar vacio";
    if (!input.segundo_nombre)
      errors.segundo_nombre = "El campo no puede estar vacio";
    if (!input.primer_apellido)
      errors.primer_apellido = "El nombre no puede contener numeros";
    if (!input.segundo_apellido)
      errors.segundo_apellido = "El nombre no puede contener numeros";
    if (!input.tipo_documento)
      errors.tipo_documento = "El campo no puede estar vacio";
  }

  if (input.vendedor_sucursal) {
    if (!input.primer_nombre)
      errors.primer_nombre = "El campo no puede estar vacio";
    if (!input.segundo_nombre)
      errors.segundo_nombre = "El campo no puede estar vacio";
    if (!input.primer_apellido)
      errors.primer_apellido = "El nombre no puede contener numeros";
    if (!input.segundo_apellido)
      errors.segundo_apellido = "El nombre no puede contener numeros";
    if (!input.tipo_documento)
      errors.tipo_documento = "El campo no puede estar vacio";
    if (!input.numero_documento)
      errors.numero_documento = "El campo no puede estar vacio";
  }

  if (input.usuario_vendedor) {
    if (!input.primer_nombre)
      errors.primer_nombre = "El campo no puede estar vacio";
    if (!input.segundo_nombre)
      errors.segundo_nombre = "El campo no puede estar vacio";
    if (!input.primer_apellido)
      errors.primer_apellido = "El nombre no puede contener numeros";
    if (!input.segundo_apellido)
      errors.segundo_apellido = "El nombre no puede contener numeros";
    if (!input.tipo_documento)
      errors.tipo_documento = "El campo no puede estar vacio";
    if (!input.numero_documento)
      errors.numero_documento = "El campo no puede estar vacio";
    if (!input.vendedor_sucursal)
      errors.vendedor_sucursal = "El campo no puede estar vacio";
  }

  if (input.contraseña_vendedor) {
    if (!input.primer_nombre)
      errors.primer_nombre = "El campo no puede estar vacio";
    if (!input.segundo_nombre)
      errors.segundo_nombre = "El campo no puede estar vacio";
    if (!input.primer_apellido)
      errors.primer_apellido = "El nombre no puede contener numeros";
    if (!input.segundo_apellido)
      errors.segundo_apellido = "El nombre no puede contener numeros";
    if (!input.tipo_documento)
      errors.tipo_documento = "El campo no puede estar vacio";
    if (!input.numero_documento)
      errors.numero_documento = "El campo no puede estar vacio";
    if (!input.vendedor_sucursal)
      errors.vendedor_sucursal = "El campo no puede estar vacio";
    if (!input.usuario_vendedor)
      errors.usuario_vendedor = "El campo no puede estar vacio";
  }

  if (
    input.primer_nombre &&
    input.segundo_nombre &&
    input.primer_apellido &&
    input.segundo_apellido &&
    input.tipo_documento &&
    input.numero_documento &&
    input.vendedor_sucursal &&
    input.usuario_vendedor &&
    !input.contraseña_vendedor
  ) {
    errors.contraseña_vendedor = "El campo no puede estar vacio";
  }

  return errors;
};

const contentNumber = (string) => {
  for (let i = 1; i < 10; i++) {
    if (string.includes(i)) return true;
  }

  return false;
};

const notSpaces = (string) => {
  let array = string.split("");

  for (let i = 0; i < array.length; i++) {
    if (array[i] === " ") return true;
  }

  return false;
};

const contentLetter = (number) => {
  if (!parseInt(number)) return true;

  return false;
};

export default validations;
