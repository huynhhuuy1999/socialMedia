import React from "react";

import "./style.scss";
import Post from "../post/post";

export default function NewFeed() {
  return (
    <div>
      <Post
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
      />
    </div>
  );
}
