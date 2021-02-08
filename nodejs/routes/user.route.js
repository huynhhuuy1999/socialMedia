const express = require("express");
const multer = require("multer");
const controller = require("../controller/user.controller");
// const upload = multer({ dest: './public/uploads/' });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage }).single("file");
// var upload = multer({ dest: './public/uploads/' });

const router = express.Router();
router.post("/login", controller.login);
router.get("/getuserid/:id", controller.getUserId);
router.get("/getuserbrown/:id", controller.getBrownUser);
router.post("/addfollow", controller.addFollow);
router.get("/getfollow/:id", controller.getUserFollowed);
router.get("/getinfouser/:id", controller.getInfoUser);
router.post("/unfollow", controller.unfollow);
router.post("/edituser", controller.editUser);
router.post("/register", controller.register);
router.post(
  "/changeavatar",
  function (req, res,next) {
    // console.log(req.file);
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      console.log(req);
      return res.status(200).send(req.file);
    });
    // next();
  }
  // ,
  // controller.changeAvatar
);
router.post("/saveavatar",controller.saveAvatar);
// router.post('/changeavatar',upload.single('file'),controller.changeAvatar);

module.exports = router;
