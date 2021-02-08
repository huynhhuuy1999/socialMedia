const md5 = require('md5');
require('dotenv').config()
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const multer  = require('multer');
module.exports.login = async (req, res) => {
  const inUser = req.body.username;
  const inPass = req.body.password;
  console.log(inUser, inPass);
  if (inUser !== null && inPass !== null) {
    const pass = md5(inPass);
    const user = await User.find({ username: inUser, password: pass });
    await console.log(user);
    if (user.length > 0) {
      return res.json({ status: "success", user: user });
    }
    return res.json({ status: "fail" });
  } else {
    return res.json({ status: "fail" });
  }
};
module.exports.register = (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  if(username!==null && password!==null){
    let pass = md5(password);
    let user = new User({
      _id: new mongoose.mongo.ObjectId(),
      name: name,
      email: email,
      username: username,
      password:pass,
      follow: []
    });
    user.save((err, user) => {
      if (err) {
        console.log(err);
        return res.json({ status: "fail" });
      } else {
        console.log(user);
        return res.json({ status: "success" });
      }
    });
  }
}
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
  const avatarUserFollow = req.body.avatarUserFollow;
  const userCurrent = await User.find({ _id: userId });
  let listFollow = userCurrent[0].follow;
  let newListFollow = [...listFollow];
  newListFollow.push({
    userId: userIdFollow,
    name: name,
    avatarUserFollow:avatarUserFollow
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
module.exports.getUserFollowed = async (req, res) => {
  const userId = req.params.id;
  const userCurrent = await User.find({ _id: userId }).select({ follow: 1 });
  return res.json({
    list: userCurrent[0].follow,
  });
};
module.exports.getInfoUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  return res.json({ user: user });
};
module.exports.unfollow = async (req, res) => {
  const currentUserId = req.body.currentUserId;
  const friendUserId = req.body.friendUserId;
  const user = await User.find({ _id: currentUserId });
  let listUserCurrentFollow = [...user[0].follow];
  let index = listUserCurrentFollow.findIndex((x) => x.userId === friendUserId);
  listUserCurrentFollow.splice(index, 1);
  const userUpdate = await User.findOneAndUpdate(
    { _id: currentUserId },
    { follow: listUserCurrentFollow },
    {
      new: true,
      upsert: true,
    }
  );
  return res.json({ status: "success" });
};
module.exports.editUser = async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const email = req.body.email;
  const updateUser = await User.findOneAndUpdate(
    { _id: userId },
    { name: name, email: email },
    { new: true, upsert: true }
  );
  // const updatePost = await Post.findOneAndUpdate(
  //   { userId: userId },
  //   {
  //     name: name,
  //   },
  //   { new: true, upsert: true }
  // );
  const updatePost = await Post.find({userId:userId}).updateMany({name:name});
  const listPost = await Post.find({}).select({comment:1});//lấy list comment và các postid
  const newListPost = [...listPost];
  for(let i = 0; i<newListPost.length;i++){
    if(newListPost[i].comment.length>0){
      for (const item of newListPost[i].comment) {
        if(item.userId == userId){
          item.name = name;
        }
      }
    }
  }
  for (const iterator of newListPost) {
    await Post.findByIdAndUpdate(iterator._id,{comment:iterator.comment});
  }
  return res.json({ status: "success" });
};

module.exports.saveAvatar = async (req,res)=>{
  const nameFile = req.body.filename;
  const userid = req.body.userId;
  const update = await User.findOneAndUpdate(
    { _id: userid },
    { avatar: nameFile },
    {
      new: true,
      upsert: true,
    }
  );

  const listUser = await User.find({}).select({follow:1});//lấy list follow
  const newListUser = [...listUser];
  for(let i = 0; i<newListUser.length;i++){
    if(newListUser[i].follow.length>0){
      for (const item of newListUser[i].follow) {
        if(item.userId == userid){
          item.avatar = nameFile;
        }
      }
    }
  }
  for (const iterator of newListUser) {
    await User.findByIdAndUpdate(iterator._id,{follow:iterator.follow});
  }



  const updatePost = await Post.find({userId:userid}).updateMany({avatar:nameFile});
  const listPost = await Post.find({}).select({comment:1});//lấy list comment và các postid
  const newListPost = [...listPost];
  for(let i = 0; i<newListPost.length;i++){
    if(newListPost[i].comment.length>0){
      for (const item of newListPost[i].comment) {
        if(item.userId == userid){
          item.avatar = nameFile;
        }
      }
    }
  }
  for (const iterator of newListPost) {
    await Post.findByIdAndUpdate(iterator._id,{comment:iterator.comment});
  }
  return res.json({status:"success"});
}