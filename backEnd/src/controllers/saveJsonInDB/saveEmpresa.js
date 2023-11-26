const jsonInfo = require("../../utils/json/empresas.json");
const { EMPRESA } = require("../../database/db");

const saveEmpresa = async () => {
  for (const register of jsonInfo) {
    let [empresa] = await EMPRESA.findOrCreate({
      where: register,
    });
  }
};

module.exports = {
  saveEmpresa,
};
