const expess = require("express");
const controller = require("../controller/post.controller");

const router = expess.Router();
router.get("/listpost",controller.getListPost);
router.post("/addpost",controller.addPost);

module.exports = router;