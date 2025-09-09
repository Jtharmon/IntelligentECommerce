const axios = require("axios");

axios.get("https://localhost:5001/api/products", { httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }) })
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
