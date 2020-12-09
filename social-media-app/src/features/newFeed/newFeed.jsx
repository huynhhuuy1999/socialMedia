import React from "react";
import Avatar from "../../components/avatar/avatar";
import "./style.scss";

export default function NewFeed() {
  return (
    <div className="new-feed border">
      <div className="header-new-feed p-2 d-flex">
        <div className="d-flex info">
          <Avatar width={40} height={40} />
          <div className="name ml-1 mr-1">
            <span className="name-x">Kathy</span>
            <br />
            <span>less than 5 seconds ago</span>
          </div>
        </div>

        <div className="icon-del">icon</div>
      </div>
      <div className="c-newfeed p-2">
        <p className="status">ansdhasdkajd</p>
        <div className="list-emoji d-flex">
          <div>heart</div>
          <div>comment</div>
        </div>
      </div>
      <div className="comment pl-2 pt-4 pb-4 pr-2 d-flex">
        <Avatar width={40} height={40} />
        <div className="input-comment ml-2">
          <input type="text" placeholder="Add comment" className="p-2" />
        </div>
      </div>
    </div>
  );
}
