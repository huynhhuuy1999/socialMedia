import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Avatar from "../../components/avatar/avatar";
import "./style.scss";
import { useAlert } from "react-alert";

export default function BrownUser() {
  const userId = useSelector((state) => state.user.userId);
  const [listBrownUser, setListBrownUser] = useState([]);
  const [flagFollow,setFlagFollow] = useState(true);
  const alert = useAlert();
  useEffect(() => {
    axios
      .get("/user/getuserbrown/" + userId)
      .then((res) => {
        setListBrownUser(res.data.listUserBrown);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flagFollow]);
  const handleFollow = (userIdFollow, nameUserFollow,avatarUserFollow)=>{
    axios.post("/user/addfollow",{
      userId:userId,
      nameUserFollow:nameUserFollow,
      userIdFollow:userIdFollow,
      avatarUserFollow:avatarUserFollow
    }).then(res=>{
      if(res.data.status==="success"){
        alert.show("Followed");
        setFlagFollow(!flagFollow);
      }
        
    })
    
  }
  return (
    <div className="h-100 position-fixed brownUser w-100">
      <div className="border p-2">
        <span>Browse Users</span>
      </div>
      <div className="list-browse-users border h-100">
        {listBrownUser.map((item, index) => {
          return (
            <div
              className="browse-item d-flex justify-content-between"
              key={index}
            >
              <div className="d-flex p-2 align-items-center">
                <Avatar width={40} height={40} url={`http://localhost:9080/uploads/${item.avatar}`}/>
                <div className="name ml-1 mr-1">{item.name}</div>
              </div>
              <button onClick={()=>handleFollow(item._id, item.name,item.avatar)}>Follow</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
