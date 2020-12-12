const User = require("../models/user.model");
module.exports.login = async (req, res) => {
  const inUser = req.body.username;
  const inPass = req.body.password;
  console.log(inUser, inPass);
  if (inUser !== null && inPass !== null) {
    const user = await User.find({ username: inUser, password: inPass });
    await console.log(user);
    if (user.length > 0) {
      return res.json({ status: "success", user: user });
    }
    return res.json({ status: "fail" });
  } else {
    return res.json({ status: "fail" });
  }
};
module.exports.getUserId = async (req, res) => {
  const userId = req.params.id;
  const infoUser = await User.find({ _id: userId });
  let listFollow = [];
  for (const item of infoUser[0].follow) {
    listFollow.push(item.userId);
  }
  let listUserId = listFollow;
  listUserId.push(userId);
  return res.json({ listUserId: listUserId });
};
module.exports.getBrownUser = async (req, res) => {
  const userId = req.params.id;
  // console.log(object)
  const infoUser = await User.find({ _id: userId });
  let listFollow = [];
  for (const item of infoUser[0].follow) {
    listFollow.push(item.userId);
  }
  let listUserId = listFollow;
  listUserId.push(userId);
  const listUserBrown = await User.find({ _id: { $nin: listUserId } });
  console.log(listUserBrown);
  return res.json({ listUserBrown: listUserBrown });
};
module.exports.addFollow = async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.nameUserFollow;
  const userIdFollow = req.body.userIdFollow;
  const userCurrent = await User.find({ _id: userId });
  let listFollow = userCurrent[0].follow;
  let newListFollow = [...listFollow];
  newListFollow.push({
    userId: userIdFollow,
    name: name,
  });
  const userUpdate = await User.findOneAndUpdate(
    { _id: userId },
    { follow: newListFollow },
    {
      new: true,
      upsert: true,
    }
  );
  return res.json({ status: "success" });
};
module.exports.getUserFollowed = async(req,res)=>{
  const userId = req.params.id;
  const userCurrent = await User.find({_id:userId}).select({follow:1});
  return res.json({
    list:userCurrent[0].follow
  });
}
module.exports.getInfoUser= async (req, res)=>{
  const id = req.params.id;
  const user= await User.find({_id:id});
  return res.json({user:user});
}
module.exports.unfollow = async (req,res)=>{
  const currentUserId = req.body.currentUserId;
  const friendUserId = req.body.friendUserId;
  const user= await User.find({_id:currentUserId});
  let listUserCurrentFollow = [...user[0].follow];
  let index = listUserCurrentFollow.findIndex(x=>x.userId===friendUserId);
  listUserCurrentFollow.splice(index,1);
  const userUpdate = await User.findOneAndUpdate(
    { _id: currentUserId },
    { follow: listUserCurrentFollow },
    {
      new: true,
      upsert: true,
    }
  );
  return res.json({status:"success"});
}