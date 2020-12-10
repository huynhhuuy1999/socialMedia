import React from "react";
import Avatar from "../../components/avatar/avatar";
import "./style.scss";

export default function ItemComment(props) {
  return (
    <div className="d-flex item-comment border-bottom border-secondary pb-1 pt-2">
      <Avatar width={40} height={40} />
      <div className="pl-1 pr-1">
        <span className="name-comment">{props.name}</span>
        <br />
        <span className="c-comment">{props.content}</span>
        <br />
        <span className="time">3 minutes ago</span>
      </div>
    </div>
  );
}
