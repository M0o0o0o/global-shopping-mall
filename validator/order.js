const { body } = require("express-validator");
const index = require("./index");
const errorCodes = require("../codes/errorCodes");

function postOrder() {
  return [
    body("quantity")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isInt({ min: 1, max: 72 })
      .withMessage("최대 수문 수량은 72개입니다."),
    body("price")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isInt()
      .withMessage(errorCodes.ONLYINT),
    body("buyr_city")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 50 })
      .withMessage(errorCodes.EXCEEDLENGTH(50)),
    body("buyr_country")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 2 })
      .withMessage(errorCodes.EXCEEDLENGTH(2)),
    body("buyr_zip")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 40 })
      .withMessage(errorCodes.EXCEEDLENGTH(40)),
    body("buyr_name")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 50 })
      .withMessage(errorCodes.EXCEEDLENGTH(50)),
    body("delivery_num")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 50 })
      .withMessage(errorCodes.EXCEEDLENGTH(50)),
    body("coupon")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.REQUIRED)
      .isLength({ max: 36 })
      .withMessage(errorCodes.EXCEEDLENGTH(36)),
    index,
  ];
}

module.exports = {
  postOrder,
};
