import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../components/avatar/avatar";
import "./style.scss";

export default function InfoUser(props) {
  const [flagFollow,setFlagFollow] = useState(true);
  const currentUserId = useSelector(state=>state.user.userId);
  const alert = useAlert();
  const hanldeUnfollow = ()=>{
    setFlagFollow(!flagFollow);
    const userIdFriend = props.id;
    axios.post("http://localhost:9080/user/unfollow",{
      currentUserId:currentUserId,
      friendUserId:userIdFriend
    }).then(res=>{
      if(res.data.status==="success"){alert.show("Unfollowed")}
    })
  }
  const icon = (
    <div>
      <Link to="/edit">
        <FontAwesomeIcon icon={faPencilAlt} />
      </Link>
      <br />
      <FontAwesomeIcon icon={faTrash} color="red" />
    </div>
  );
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <Avatar width={50} height={50} />
        <div className="pl-2 pr-2">
          <span>{props.name}</span>
          <br />
          <span>{props.gmail}</span>
        </div>
      </div>

      <div>
        {props.friend === 1 ? (
          <button className="btn-follow" onClick={()=>hanldeUnfollow()}>{flagFollow===true?"UNFOLLOW":"FOLLOW"}</button>
        ) : (
          icon
        )}
      </div>
    </div>
  );
}
