import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../components/avatar/avatar";
import IconLike from "../../components/iconLike/iconLike";
import ItemComment from "../itemComment/itemComment";
import "./style.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

export default function Post(props) {
  const idPost = props.idPost;
  const [flagDelPost, setFlagDelPost] = useState(false);
  const [countLike, setCountLike] = useState(props.count);
  const [comment, setCommnet] = useState("");
  const userId = useSelector((state) => state.user.userId);
  const name = useSelector((state) => state.user.name);
  const [listComment, setListComment] = useState(props.comment);
  const alert = useAlert();
  const handleLike = async () => {
    setCountLike(countLike + 1);
    axios
      .post("http://localhost:9080/post/like", {
        postId: idPost,
        countLike: countLike + 1,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelPost = () => {
    axios
      .post("http://localhost:9080/post/delpost", { postId: idPost })
      .then((res) => {
        if (res.data.status === "success") {
          setFlagDelPost(true);
          alert.show("Post deleted");
        }
      });
  };
  const handleAddComment = (event) => {
    if (event.key === "Enter") {
      axios
        .post("http://localhost:9080/post/addcomment", {
          userId: userId,
          comment: comment,
          name: name,
          postId: idPost,
        })
        .then((res) => {
          let newListComment = [...listComment];
          newListComment.push({
            userId: userId,
            content: comment,
            name: name,
          });
          setListComment(newListComment);
        })
        .then((res) => {
          setCommnet("");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      {flagDelPost === true ? (
        ""
      ) : (
        <div className="new-feed border mt-2">
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
              <div className="icon-del" onClick={() => handleDelPost()}>
                <FontAwesomeIcon icon={faTrash} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="c-newfeed p-2 bg-light">
            <p className="status">{props.status}</p>
            <div className="list-emoji d-flex">
              <IconLike count={countLike} onClick={() => handleLike()} />
            </div>
          </div>
          <div className="comment pl-2 pt-4 pr-2 d-flex">
            <Avatar width={40} height={40} />
            <div className="input-comment ml-2">
              <input
                type="text"
                placeholder="Add comment"
                className="p-2"
                onChange={(e) => setCommnet(e.target.value)}
                value={comment}
                onKeyPress={(e) => handleAddComment(e)}
              />
            </div>
          </div>
          <div className="comment pl-2 pt-4 pb-4 pr-2">
            {listComment.map((item, index) => {
              return (
                <ItemComment
                  name={item.name}
                  content={item.content}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
