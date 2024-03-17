const express = require("express");
const controller = require("./../controllers/controller");

const router = express.Router();

router.get("/", controller.getHome);

router.route('/login')
    .get(controller.getLogin)
    .post(controller.postLogin);

router.route('/register')
    .get(controller.getRegister)
    .post(controller.postRegister);

module.exports = router;
