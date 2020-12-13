import React, { useEffect, useState } from "react";
import axios from "axios";

import "./style.scss";
import Post from "../post/post";
import { useSelector } from "react-redux";

export default function NewFeed(props) {
  const [listPost, setListPost] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const x = props.x;

  useEffect(() => {
    axios.get("http://localhost:9080/user/getuserid/" + userId).then((res) => {
      axios
        .post("http://localhost:9080/post/listpost", {
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
        if (item.userId === userId) friend = 0;
        return (
          <Post
            name={item.name}
            status={item.content}
            time="a day ago"
            count={item.countLike}
            friend={friend}
            key={item._id}
            idPost={item._id}
            comment={item.comment}
          />
        );
      })}
      {x}
    </div>
  );
}
