const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()

const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

app.use("/user",userRoute);
app.use("/post",postRoute);

app.use(express.static('public'));

const port = process.env.PORT||9080;
app.listen(port,()=>{console.log("Server is starting on ",port)});