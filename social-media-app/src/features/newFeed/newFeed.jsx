import React, { useEffect, useState } from "react";
import axios from "axios";

import "./style.scss";
import Post from "../post/post";
import { useSelector } from "react-redux";
import moment from "moment";

export default function NewFeed(props) {
  const [listPost, setListPost] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const x = props.x;

  useEffect(() => {
    axios.get("/user/getuserid/" + userId).then((res) => {
      axios
        .post("/post/listpost", {
          userId: res.data.listUserId,
        })
        .then((res) => {
          setListPost(res.data.list);
        });
    });
  }, [x]);
  return (
    <div>
      {listPost.map((item) => {
        let friend = 1;
        let time = "";
        console.log(item.time);
        if (item.userId === userId) friend = 0;
        if(item.time===undefined){
          
        }
        else{
          time = moment(item.time).format("DD-MM-YYYY hh:mm a");
        }
        return (
          <Post
            name={item.name}
            status={item.content}
            time={time}
            count={item.countLike}
            friend={friend}
            key={item._id}
            idPost={item._id}
            comment={item.comment}
            avatar={item.avatar}
          />
        );
      })}
      {x}
    </div>
  );
}
