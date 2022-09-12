const { body, param, query } = require("express-validator");
const index = require("./index");
const errorCodes = require("../codes/errorCodes");

function postCouponValidator() {
  return [
    body("amount")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isInt({ min: 1, max: 100 })
      .withMessage(errorCodes.ONLYINT),
    body("content")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 200 })
      .withMessage(errorCodes.EXCEEDLENGTH(200)),
    body("category_id")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 36 })
      .withMessage(errorCodes.EXCEEDLENGTH(36)),
    index,
  ];
}

function getOneCouponValidator() {
  return [
    param("id")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 36 })
      .withMessage(errorCodes.EXCEEDLENGTH(36)),
    index,
  ];
}

function getCouponsValidator() {
  return [
    query("page")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isInt()
      .withMessage(errorCodes.ONLYINT),
    index,
  ];
}

module.exports = {
  postCouponValidator,
  getOneCouponValidator,
  getCouponsValidator,
};
