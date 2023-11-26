const { saveJsonInDB } = require("../controllers/saveJsonInDB/saveJsonInDB");

const handlerSaveJsonInDB = async (request, response) => {
  try {
    await saveJsonInDB();
    response.json("La carga de datos a la DB se ha hecho correctamente");
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerSaveJsonInDB,
};
