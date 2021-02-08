const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  follow: [{ userId: String, name: String, avatar: String }],
  avatar: {type:String}
});
const user = mongoose.model("Users", userSchema, "Users");
module.exports = user;
