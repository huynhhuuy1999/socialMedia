const Post = require("../models/post.model");
const mongoose = require("mongoose");

module.exports.getListPost = async (req, res)=>{
    const userId = req.body.userId;
    const post = await Post.find({userId:{$in:userId}}).sort({_id:-1});
    return res.json({list:post});
}
module.exports.addPost = async (req,res)=>{
    let userId = req.body.userId;
    let content = req.body.content;
    let name = req.body.name;
    let post = new Post({
        _id: new mongoose.mongo.ObjectId(),
        userId: userId,
        content: content,
        countLike: 0,
        name:name
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
module.exports.getListPostUser = async(req,res)=>{
    const id = req.params.id;
    const post = await Post.find({userId:id}).sort({_id:-1});
    return res.json({listPost:post});
}
module.exports.delPost = async (req,res)=>{
    const post = await Post.deleteOne({_id:req.body.postId});
    return res.json({
        status:"success"
    });
}