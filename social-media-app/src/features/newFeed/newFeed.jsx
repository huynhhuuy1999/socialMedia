import React, { useEffect, useState } from "react";
import axios from "axios";

import "./style.scss";
import Post from "../post/post";

export default function NewFeed() {
  const [name, setName] = useState([]);
  const [status, getStatus] = useState([]);
  const [time, setTime] = useState([]);
  const [count, setCount] = useState([]);
  const [listPost, setListPost] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9080/post/listpost").then((res) => {
      setListPost(res.data.list);
    });
  });
  return (
    <div>
      {listPost.map((item, index) => (
        <Post
          name="abc"
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
    </div>
  );
}
