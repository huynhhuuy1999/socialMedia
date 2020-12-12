const expess = require("express");
const controller = require("../controller/post.controller");

const router = expess.Router();
router.post("/listpost",controller.getListPost);
router.post("/addpost",controller.addPost);
router.get("/getlistpostuser/:id",controller.getListPostUser);
router.post("/delpost",controller.delPost);

module.exports = router;