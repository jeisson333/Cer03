const axios = require("axios");

const requestBody = {
  id: "6f722d7f-515b-4705-a007-84b07317cc20", // Data you want to send in the body
};

const queryParams = {
  name: "leche", // Query parameters
};

axios
  .get("http://localhost:3001/products", {
    params: queryParams, // Setting query parameters in Axios
    data: requestBody, // Setting request body in Axios (won't be used in GET but added for example)
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
