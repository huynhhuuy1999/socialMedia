const User = require("../models/user.model");
module.exports.login = async (req, res) => {
  const inUser = req.body.username;
  const inPass = req.body.password;
  console.log(inUser,inPass);
  if (inUser !== null && inPass !== null) {
    const user = await User.find({ username: inUser, password: inPass });
    await console.log(user);
    if (user.length > 0) {
      return res.json({ status: "success"  ,user:user});
    }
    return res.json({ status: "fail"});
  } else {
    return res.json({ status: "fail" });
  }
};
