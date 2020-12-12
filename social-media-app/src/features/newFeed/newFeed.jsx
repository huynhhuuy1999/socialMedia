import React, { useEffect, useState } from "react";
import axios from "axios";

import "./style.scss";
import Post from "../post/post";
import { useSelector } from "react-redux";

export default function NewFeed(props) {
  const [listPost, setListPost] = useState([]);
  const userId = useSelector(state=>state.user.userId);
  const x = props.x;
  
  useEffect(() => {
    axios.get("http://localhost:9080/user/getuserid/"+userId).then(res=>{
      axios.post("http://localhost:9080/post/listpost",{
        userId:res.data.listUserId
      }).then((res) => {
        setListPost(res.data.list);
      });
    })
  },[x]);
  return (
    <div>
      {listPost.map((item, index) => (
        <Post
          name={item.name}
          status={item.content}
          time="a day ago"
          count={item.countLike}
          friend={1}
          key={index}
        />
      ))}
      {/* <Post
        name="kathy"
        status="snskdja dasjdk lad kjdlaks djlasd sldjsal djldk ald jsladjsal dald ald jasld ajldasj dlj dl jksdhakjsd akd hakd"
        time="a month ago"
        count={5}
        friend={1}
      />
      <Post
        name="kathy"
        status="snskdja dasjdk lad kjdlaks djlasd sldjsal djldk ald jsladjsal dald ald jasld ajldasj dlj dl jksdhakjsd akd hakd"
        time="a month ago"
        count={5}
        friend={0}
      /> */}
      {x}
    </div>
  );
}
