const fs = require("fs");
const path = require("path");

const handlerSequealizeModels = ({ sequelize }) => {
  const basename = path.basename(__filename);

  const modelDefiners = [];

  fs.readdirSync(path.join(__dirname, "../models"))
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, "../models", file)));
    });

  modelDefiners.forEach((model) => model(sequelize));

  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
  ]);
  sequelize.models = Object.fromEntries(capsEntries);
};

const handlerAssociationModels = ({ sequelize }) => {
  const {
    CATALOGO_UNIVERSAL,
    CONTACTO_SUCURSAL,
    DETALLES_VENTA,
    EMPRESA,
    INVENTARIO_PRODUCTO,
    PRODUCTO,
    SUCURSAL,
    VENDEDOR,
    VENTA,
  } = sequelize.models;

  CATALOGO_UNIVERSAL.hasOne(CATALOGO_UNIVERSAL, {
    foreignKey: {
      name: "tipo_catalogo",
    },
  });

  CATALOGO_UNIVERSAL.belongsTo(CATALOGO_UNIVERSAL, {
    foreignKey: {
      name: "tipo_catalogo",
    },
  });

  SUCURSAL.hasMany(CONTACTO_SUCURSAL, {
    foreignKey: {
      name: "contacto_sucursal",
    },
  });

  CONTACTO_SUCURSAL.belongsTo(SUCURSAL, {
    foreignKey: {
      name: "contacto_sucursal",
    },
  });

  CATALOGO_UNIVERSAL.hasOne(CONTACTO_SUCURSAL, {
    foreignKey: {
      name: "tipo_contacto",
    },
  });

  CONTACTO_SUCURSAL.belongsTo(CATALOGO_UNIVERSAL, {
    foreignKey: {
      name: "tipo_contacto",
    },
  });

  CATALOGO_UNIVERSAL.hasOne(VENDEDOR, {
    foreignKey: {
      name: "tipo_documento",
    },
  });

  VENDEDOR.belongsTo(CATALOGO_UNIVERSAL, {
    foreignKey: {
      name: "tipo_documento",
    },
  });

  SUCURSAL.hasOne(VENDEDOR, {
    foreignKey: {
      name: "vendedor_sucursal",
    },
  });

  VENDEDOR.belongsTo(SUCURSAL, {
    foreignKey: {
      name: "vendedor_sucursal",
    },
  });

  EMPRESA.hasOne(SUCURSAL, {
    foreignKey: {
      name: "sucursal_empresa",
    },
  });

  SUCURSAL.belongsTo(EMPRESA, {
    foreignKey: {
      name: "sucursal_empresa",
    },
  });

  CATALOGO_UNIVERSAL.hasOne(PRODUCTO, {
    foreignKey: {
      name: "tipo_producto",
    },
  });

  PRODUCTO.belongsTo(CATALOGO_UNIVERSAL, {
    foreignKey: {
      name: "tipo_producto",
    },
  });

  EMPRESA.hasOne(PRODUCTO, {
    foreignKey: {
      name: "producto_empresa",
    },
  });

  PRODUCTO.belongsTo(EMPRESA, {
    foreignKey: {
      name: "producto_empresa",
    },
  });

  PRODUCTO.hasMany(INVENTARIO_PRODUCTO, {
    foreignKey: {
      name: "inventario_producto",
    },
  });

  INVENTARIO_PRODUCTO.belongsTo(PRODUCTO, {
    foreignKey: {
      name: "inventario_producto",
    },
  });

  SUCURSAL.hasOne(INVENTARIO_PRODUCTO, {
    foreignKey: {
      name: "inventario_sucursal",
    },
  });

  INVENTARIO_PRODUCTO.belongsTo(SUCURSAL, {
    foreignKey: {
      name: "inventario_sucursal",
    },
  });

  CATALOGO_UNIVERSAL.hasOne(VENTA, {
    foreignKey: {
      name: "metodo_pago",
    },
  });

  VENTA.belongsTo(CATALOGO_UNIVERSAL, {
    foreignKey: {
      name: "metodo_pago",
    },
  });

  SUCURSAL.hasOne(VENTA, {
    foreignKey: {
      name: "venta_sucursal",
    },
  });

  VENTA.belongsTo(SUCURSAL, {
    foreignKey: {
      name: "venta_sucursal",
    },
  });

  PRODUCTO.hasOne(DETALLES_VENTA, {
    foreignKey: {
      name: "venta_producto",
    },
  });

  DETALLES_VENTA.belongsTo(PRODUCTO, {
    foreignKey: {
      name: "venta_producto",
    },
  });

  VENTA.hasMany(DETALLES_VENTA, {
    foreignKey: {
      name: "detalles_venta",
    },
  });

  DETALLES_VENTA.belongsTo(VENTA, {
    foreignKey: {
      name: "detalles_venta",
    },
  });
};

module.exports = {
  handlerSequealizeModels,
  handlerAssociationModels,
};
