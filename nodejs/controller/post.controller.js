const Post = require("../models/post.model");
const mongoose = require("mongoose");
const moment = require("moment");

module.exports.getListPost = async (req, res) => {
  const userId = req.body.userId;
  const post = await Post.find({ userId: { $in: userId } }).sort({ _id: -1 });
  return res.json({ list: post });
};
module.exports.addPost = async (req, res) => {
  let userId = req.body.userId;
  let content = req.body.content;
  let name = req.body.name;
  let avatar = req.body.avatar;
  let time = moment();
  // console.log(time.format("DD-MM-YYYY hh:mm a"));
  let post = new Post({
    _id: new mongoose.mongo.ObjectId(),
    userId: userId,
    content: content,
    countLike: 0,
    time: time,
    name: name,
    avatar:avatar
  });
  post.save((err, post) => {
    if (err) {
      console.log(err);
      return res.json({ status: "fail" });
    } else {
      console.log(post);
      return res.json({ status: "success" });
    }
  });
};
module.exports.getListPostUser = async (req, res) => {
  const id = req.params.id;
  const post = await Post.find({ userId: id }).sort({ _id: -1 });
  return res.json({ listPost: post });
};
module.exports.delPost = async (req, res) => {
  const post = await Post.deleteOne({ _id: req.body.postId });
  return res.json({
    status: "success",
  });
};
module.exports.likePost = async (req, res) => {
  const idPost = req.body.postId;
  const countLike = req.body.countLike;
  console.log(idPost, countLike);
  const postUpdate = await Post.findOneAndUpdate(
    { _id: idPost },
    { countLike: countLike },
    {
      new: true,
      upsert: true,
    }
  );
  return res.json({ status: "success" });
};
module.exports.addComment = async (req, res) => {
  const userId = req.body.userId;
  const comment = req.body.comment;
  const name = req.body.name;
  const avatar = req.body.avatar;
  const postId = req.body.postId;
  const post = await Post.find({ _id: postId }).select({ comment: 1 });
  let time = moment().format("DD-MM-YYYY hh:mm a");
  let listComment = [...post[0].comment];
  listComment.unshift({
    userId: userId,
    content: comment,
    name: name,
    timeComment: time,
    avatar:avatar
  });
  const update = await Post.findOneAndUpdate(
    { _id: postId },
    { comment: listComment },
    {
      new: true,
      upsert: true,
    }
  );
  const postRes = await Post.find({ _id: postId }).select({ comment: 1 });
  return res.json({ postRes: postRes[0].comment });
};
module.exports.delComment = async (req, res) => {
  const postId = req.body.postId;
  const commentId = req.body.commentId;
  let listComment = await Post.find({ _id: postId }).select({ comment: 1 });
  let newListComment = [...listComment[0].comment];
  console.log(`listComment:${newListComment},postId:${postId},commentId:${commentId}`);
  let index = newListComment.findIndex((x) => x._id == commentId);
  if (index === -1) {
    return res.json({ status: "fail" });
  }
  newListComment.splice(index, 1);
  const update = await Post.findOneAndUpdate(
    { _id: postId },
    { comment: newListComment },
    {
      new: true,
      upsert: true,
    }
  );
  return res.json({ status: "success" });
};
