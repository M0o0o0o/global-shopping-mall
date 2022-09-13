const { Country } = require("../database/models");
const logger = require("../logger");

const findCountry = async (country_code) => {
  try {
    const country = await Country.findOne({ where: { country_code } });
    return country;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

module.exports = { findCountry };
