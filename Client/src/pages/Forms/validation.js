import validator from "validator";
const validation = ({ newProduct }) => {
  let errors = {};
  for (let index = 0; index < Object.keys(newProduct).length; index++) {
    if (Object.keys(newProduct)[index] === "nombre_producto") {
      validateName({ newProduct, errors });
    }
    if (Object.keys(newProduct)[index] === "tipo_producto") {
      validateType({ newProduct, errors });
    }
    if (Object.keys(newProduct)[index] === "peso") {
      validateHeight({ newProduct, errors });
    }
    if (Object.keys(newProduct)[index] === "valor_compra") {
      validatePriceBuy({ newProduct, errors });
    }
    if (Object.keys(newProduct)[index] === "valor_venta") {
      validatePriceSeal({ newProduct, errors });
    }
    if (Object.keys(newProduct)[index] === "image") {
      validateImage({ newProduct, errors });
    }
  }

  return errors;
};

const validateName = ({ newProduct, errors }) => {
  if (newProduct.nombre_producto.length < 5) {
    errors.nombre_producto =
      "El nombre del producto debe ser de minimo 5 caracteres.";
  }

  if (newProduct.nombre_producto.length > 25) {
    errors.nombre_producto =
      "El nombre del producto no puede exceder los 25 caracteres.";
  }
};

const validateType = ({ newProduct, errors }) => {
  if (!newProduct.tipo_producto) {
    errors.tipo_producto = "Seleccione un tipo de producto.";
  }
};

const validateHeight = ({ newProduct, errors }) => {
  if (parseInt(newProduct.peso) <= 0) {
    errors.peso = "Ingrese un peso válido mayor a cero.";
  }
};

const validatePriceBuy = ({ newProduct, errors }) => {
  if (parseInt(newProduct.valor_compra) <= 0) {
    errors.valor_compra = "Ingrese un precio de compra válido mayor a cero.";
  }
};

const validatePriceSeal = ({ newProduct, errors }) => {
  if (parseInt(newProduct.valor_venta) <= parseInt(newProduct.valor_compra)) {
    errors.valor_venta =
      "El precio de venta debe ser mayor al precio de compra.";
  }

  if (parseInt(newProduct.valor_venta) <= 0) {
    errors.valor_venta = "Ingrese un precio de venta válido mayor a cero.";
  }
};

const validateImage = ({ newProduct, errors }) => {
  if (!validator.isURL(newProduct.image)) {
    errors.image = "Ingrese una URL válida.";
  }
};

export default validation;
