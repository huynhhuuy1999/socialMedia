import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../components/avatar/avatar";
import IconLike from "../../components/iconLike/iconLike";
import ItemComment from "../itemComment/itemComment";
import "./style.scss";

export default function Post(props) {
  return (
    <div className="new-feed border">
      <div className="header-new-feed p-2 d-flex">
        <div className="d-flex info">
          <Avatar width={40} height={40} />
          <div className="name ml-1 mr-1">
            <span className="name-x">{props.name}</span>
            <br />
            <span>{props.time}</span>
          </div>
        </div>
        {props.friend === 0 ? (
          <div className="icon-del">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="c-newfeed p-2">
        <p className="status">{props.status}</p>
        <div className="list-emoji d-flex">
          <IconLike count={props.count} />
        </div>
      </div>
      <div className="comment pl-2 pt-4 pr-2 d-flex">
        <Avatar width={40} height={40} />
        <div className="input-comment ml-2">
          <input type="text" placeholder="Add comment" className="p-2" />
        </div>
      </div>
      <div className="comment pl-2 pt-4 pb-4 pr-2">
        <ItemComment
          name="John"
          content="abcdef asdj adhsad hajdh akhakj dkahdk adhkjahsd ksdhadk ad ajhdkja sdja dhkajdh kadahdjk djka dhajd k ad sạdká adkád kádl kákldja d"
        />
        <ItemComment
          name="John"
          content="abcdef asdj adhsad hajdh akhakj dkahdk adhkjahsd ksdhadk ad ajhdkja sdja dhkajdh kadahdjk djka dhajd k ad sạdká adkád kádl kákldja d"
        />
      </div>
    </div>
  );
}
