const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userId:String,
    name:String,
    avatar:String,
    content: String,
    time: Date,
    countLike:{type:Number,default:0},
    comment:[{
        userId: String,
        name:String,
        content:String,
        timeComment: String,
        avatar:String
    }]
});

const post = mongoose.model("Post", postSchema, "Post");
module.exports= post;