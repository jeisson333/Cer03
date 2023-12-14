const validations = (input) => {
  let errors = {};

  if (input.titulo) {
    if (input.titulo.length > 30)
      errors.titulo = "*El titulo no puede tener mas de 30 caracteres";
    if (input.titulo.length < 5)
      errors.titulo = "*El titulo debe tener mas de 5 caracteres";
  }

  if (input.puntuacion) {
    if (input.puntuacion < 1 || input.puntuacion > 5)
      errors.puntuacion = "*La puntuacion debe ser entre 1 y 5";

    if (!input.titulo) errors.titulo = "*El campo no puede estar vacio";
  }

  if (input.descripcion) {
    if (input.descripcion.length > 500)
      errors.descripcion =
        "*La descripcion no puede tener mas de 500 caracteres";
    if (input.descripcion.length < 10)
      errors.descripcion = "*La descripcion debe tener mas de 10 caracteres";

    if (!input.titulo) errors.titulo = "*El campo no puede estar vacio";
    if (!input.puntuacion) errors.puntuacion = "*El campo no puede estar vacio";
  }

  if (input.titulo && input.puntuacion && !input.descripcion) {
    errors.descripcion = "*El campo no puede estar vacio";
  }

  return errors;
};

export default validations;
