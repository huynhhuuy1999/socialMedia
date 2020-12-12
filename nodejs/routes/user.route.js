const express = require("express");

const controller = require('../controller/user.controller')

const router = express.Router();
router.post("/login",controller.login);
router.get("/getuserid/:id",controller.getUserId);
router.get("/getuserbrown/:id",controller.getBrownUser);
router.post("/addfollow",controller.addFollow);
router.get("/getfollow/:id",controller.getUserFollowed);
router.get("/getinfouser/:id",controller.getInfoUser);
router.post("/unfollow",controller.unfollow);

module.exports= router;