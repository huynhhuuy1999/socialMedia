import React from "react";
import { Badge } from "antd";
import "./style.scss";

export default function IconLike(props) {
  return (
    <div className="like">
      <button onClick={props.onClick}>Thích</button>
      <Badge count={props.count} offset={[-10, -20]}>
        <a href="#" className="head-example" />
      </Badge>
    </div>
  );
}
