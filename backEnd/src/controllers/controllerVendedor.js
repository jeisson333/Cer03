const { VENDEDOR, CATALOGO_UNIVERSAL, SUCURSAL } = require("../database/db");
const { Op } = require("sequelize");

const getVendedorIdentityCard = async (identityCard) => {
  let salesman = await VENDEDOR.findOne({
    where: {
      numero_documento: identityCard,
    },
    include: [
      {
        model: SUCURSAL,
      },
      {
        model: CATALOGO_UNIVERSAL,
      },
    ],
  });
  return salesman;
};

const getVendedorByName = async (name) => {
  let salesmen = await VENDEDOR.findAll({
    where: {
      primer_nombre: {
        [Op.like]: `%${name}%`, // Busca coincidencias parciales en el nombre
      },
    },
    include: [
      {
        model: SUCURSAL,
      },
      {
        model: CATALOGO_UNIVERSAL,
      },
    ],
  });

  return salesmen;
};

const getVendedores = async ({ name, numero_documento }) => {
  let salesmen = await VENDEDOR.findAll({
    where: {
      [Op.or]: [
        {
          primer_nombre: {
            [Op.iLike]: driverFilter.name,
          },
        },
        {
          segundo_nombre: {
            [Op.iLike]: driverFilter.name,
          },
        },
        {
          primer_apellido: {
            [Op.iLike]: driverFilter.name,
          },
        },
        {
          segundo_apellido: {
            [Op.iLike]: driverFilter.name,
          },
        },
      ],
    },
  });
};

const disableVendedor = async ({ id_vendedor }) => {
  const rowsAffected = await VENDEDOR.destroy({
    where: {
      id_vendedor: id_vendedor,
    },
  });
  if (rowsAffected === 0)
    throw new Error({ error: "No se elimino el vendedor" });

  return { msg: "Se elimino el producto exitosamente" };
};

const enableVendedor = async ({ id_vendedor }) => {
  const vendedor = await VENDEDOR.restore({
    where: {
      id_vendedor: id_vendedor,
    },
  });

  if (!vendedor) throw new Error({ error: "No se restauro el vendedor" });
  else {
    return { msg: "Se restauro el vendedor exitosamente" };
  }
};

const postVendedor = async ({ values }) => {
  let [vendedor, created] = await VENDEDOR.findOrCreate({
    where: values,
  });
  if (!created) throw new Error("Vendedor ya existente");
  vendedor.setCATALOGO_UNIVERSAL(values?.tipo_documento);
  vendedor.setSUCURSAL(values?.vendedor_sucursal);

  return { msg: "Se ha creado un nuevo vendedor" };
};

module.exports = {
  getVendedorIdentityCard,
  getVendedorByName,
  postVendedor,
  disableVendedor,
  enableVendedor,
};
