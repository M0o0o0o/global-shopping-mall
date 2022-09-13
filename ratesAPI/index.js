const logger = require("../logger");
const errorCodes = require("../codes/errorCodes");
const axios = require("axios").default;

module.exports = async (amount) => {
  try {
    const URI = `https://api.apilayer.com/exchangerates_data/convert?from=KRW&to=USD&amount=${amount}`;
    const apikey = process.env.EXCHANGE_KEY;
    const response = await axios.get(URI, { headers: { apikey } });
    return response.data.result;
  } catch (err) {
    logger.error(err);
    throw new Error(errorCodes.RETRY);
  }
};
