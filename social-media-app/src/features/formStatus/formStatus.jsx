import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../components/avatar/avatar";
import "./style.scss";
import { useSelector } from "react-redux";
import NewFeed from "../newFeed/newFeed";
import { Redirect } from "react-router-dom";

export default function FormStatus() {
  const [status, setStatus] = useState("");
  const name = useSelector((state) => state.user.name);
  const userId = useSelector((state) => state.user.userId);
  const avatar = useSelector((state)=>state.user.avatar);
  const [flagPost, setFlagPost] = useState(true);
  const placeholder = `What's on your mind, ${name}`;
  const handleAddPost = (status) => {
    axios
      .post("/post/addpost", {
        userId: userId,
        content: status,
        name: name,
        avatar:avatar
      })
      .then((res) => {
        setStatus("");
        setFlagPost(!flagPost);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="form-status border">
        <div className="header-form-status d-flex p-2">
          <Avatar width={30} height={30} url={`/uploads/${avatar}`}/>
          <span className="name">{name}</span>
        </div>
        <div className="c-input-status p-2">
          <span>Add a status</span>
          <br />
          <textarea
            value={status}
            className="p-2 border"
            placeholder={placeholder}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <div className="icon-photo p-2">
            <FontAwesomeIcon icon={faCamera} />
          </div>
        </div>
        <div className="footer-form-status p-2">
          <button onClick={() => handleAddPost(status)}>Post</button>
        </div>
      </div>
      <div className="mt-4">
        <NewFeed x={flagPost} />
      </div>
    </>
  );
}
