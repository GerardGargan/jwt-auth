const express = require("express");
const controller = require("./../controllers/controller");
const middleware = require('./../middleware/middleware');

const router = express.Router();

router.get("/", controller.getHome);

router.route('/login')
    .get(controller.getLogin)
    .post(controller.postLogin);

router.route('/register')
    .get(controller.getRegister)
    .post(controller.postRegister);

router.get('/protected', middleware.isAuth, controller.getProtected);

module.exports = router;
