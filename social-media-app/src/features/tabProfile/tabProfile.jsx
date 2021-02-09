import React, { lazy, Suspense, useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import "./style.scss";
import Avatar from "../../components/avatar/avatar";
import Post from "../post/post";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

export default function TabProfile(props) {
  // const [listpost, setListpost] = useState([]);
  const idUser = props.idUser;
  let listpost = props.listPost;
  let a ="";
  a = listpost.map((item, index) => {
    let time = item.time;
    let formatTime = moment(time).format("DD-MM-YYYY hh:mm a");
    return (
      <Post
        key={index}
        name={item.name}
        status={item.content}
        time={formatTime}
        count={item.countLike}
        friend={props.friend}
        idPost={item._id}
        comment={item.comment}
        avatar={item.avatar}
      />
    );
  });
  // const userId = useSelector((state) => state.user.userId);
  const [listFollow, setListFollow] = useState([]);
  useEffect(() => {
    console.log("effect")
    axios
      .get("/user/getfollow/" + idUser)
      .then((res) => {
        setListFollow(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  },[idUser]);
  return (
    <div className="tab-profile">
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="POSTS" key="1">
          <div className="post">
            {a}
          </div>
        </TabPane>
        <TabPane tab="FOLLOWING" key="2">
          <div className="d-flex">
            {listFollow.map((item, index) => {
              let urlProfile = `/profile/${item.userId}`;
              return (
                <div>
                  <Link to={urlProfile} key={index}>
                    <Avatar width={40} height={40} url={`/uploads/${item.avatar}`}/>
                    <span className="text-center text-dark">{item.name}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab="FOLLOWERS" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      {/* {
        test.map((item,index)=>{
          return(
<p>{item}</p>
          )
          
        })
      } */}
    </div>
  );
}
