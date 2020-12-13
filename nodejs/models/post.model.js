const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userId:String,
    name:String,
    content: String,
    countLike:{type:Number,default:0},
    comment:[{
        userId: String,
        name:String,
        content:String
    }]
});

const post = mongoose.model("Post", postSchema, "Post");
module.exports= post;