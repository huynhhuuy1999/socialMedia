import Axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import Avatar from "../../components/avatar/avatar";
import "./style.scss";

export default function ItemComment(props) {
  const [flagDelComment,setFlagDelComment] = useState(0);
  const alert = useAlert();
  const handleDeleteComment = ()=>{
    Axios.post("/post/delcomment",{
      postId: props.postId,
      commentId: props.id
    }).then(res=>{
      if(res.data.status==="success"){
        setFlagDelComment(1);
        alert.show("Comment Deleted");
      }
      else{
        alert.show("ERROR");
      }
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    flagDelComment===0?(
      <div className="d-flex item-comment border-bottom border-secondary pb-1 pt-2">
      <Avatar width={40} height={40} url={`/uploads/${props.avatar}`}/>
      <div className="pl-1 pr-1">
        <span className="name-comment">{props.name}</span>
        <br />
        <span className="c-comment">{props.content}</span>
        <br />
        <span className="time">{props.time}</span>
        <br/>
        {
          props.isFriend===0?<span className="comment-del" onClick={()=>handleDeleteComment()}>Xóa</span>:""
        }
      </div>
    </div>
    ):""
  );
}
