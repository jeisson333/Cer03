const server = require("./src/app.js");
const { conn } = require("./src/database/db.js");
const createCatalogueType = require("./src/helpers/createCatalogueType.js");
const PORT = process.env.PORT || 3001;

conn
  .sync({ force: false })
  .then(() => {
    createCatalogueType();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
