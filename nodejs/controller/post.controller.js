const Post = require("../models/post.model");
const mongoose = require("mongoose");

module.exports.getListPost = async (req, res)=>{
    const post = await Post.find({});
    return res.json({list:post});
}
module.exports.addPost = async (req,res)=>{
    let userId = req.body.userId;
    let content = req.body.content;
    let post = new Post({
        _id: new mongoose.mongo.ObjectId(),
        userId: userId,
        content: content,
        countLike: 0
    });
    post.save((err,post)=>{
        if(err){
            console.log(err);
            return res.json({status:"fail"})
        }
        else{
            console.log(post)
            return res.json({status:"success"})
        }
    });
}