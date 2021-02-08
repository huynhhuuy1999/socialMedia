const expess = require("express");
const controller = require("../controller/post.controller");

const router = expess.Router();
router.post("/listpost",controller.getListPost);
router.post("/addpost",controller.addPost);
router.get("/getlistpostuser/:id",controller.getListPostUser);
router.post("/delpost",controller.delPost);
router.post("/like",controller.likePost);
router.post("/addcomment",controller.addComment);
router.post("/delcomment",controller.delComment);

module.exports = router;