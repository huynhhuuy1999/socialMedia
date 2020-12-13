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
  const userId = useSelector(state=>state.user.userId);
  const [flagPost,setFlagPost] = useState(true);
  const handleAddPost = (status)=>{
    axios.post("http://localhost:9080/post/addpost",{
      userId: userId,
      content: status,
      name: name
    }).then(res=>{
      setStatus("");
      setFlagPost(!flagPost);
    }).catch(err=>{console.log(err);});
  }
  return (
    <>
    <div className="form-status border">
      <div className="header-form-status d-flex p-2">
        <Avatar width={30} height={30} />
        <span className="name">{name}</span>
      </div>
      <div className="c-input-status p-2">
        <span>Add a status</span>
        <br />
        <input
          type="text"
          value={status}
          className="p-2"
          placeholder="What's on your mind,"
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div>
        <div className="icon-photo p-2">
          <FontAwesomeIcon icon={faCamera} />
        </div>
      </div>
      <div className="footer-form-status p-2">
        <button onClick={()=>handleAddPost(status)}>Post</button>
      </div>
    </div>
    <div className="mt-4">
      <NewFeed x={flagPost}/>
    </div>
    
    </>
  );
}
