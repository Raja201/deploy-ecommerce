const dotenv = require("dotenv");
const paypal = require("paypal-rest-sdk");
dotenv.config();

paypal.configure({
  mode: process.env.MODE,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

module.exports = paypal;
