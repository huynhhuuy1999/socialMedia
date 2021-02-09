import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoUser from "../../features/infoUser/infoUser";
// import TabProfile from "../../features/tabProfile/tabProfile";
import "./style.scss";
import { useSelector } from "react-redux";
const TabProfile = lazy(() => import("../../features/tabProfile/tabProfile"));

export default function Profile() {
  const nameCurrent = useSelector((state) => state.user.name);
  const emailCurrent = useSelector((state) => state.user.email);
  const userIdCurrent = useSelector((state) => state.user.userId);
  const avatarCurrent = useSelector((state)=> state.user.avatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { id } = useParams();
  const [listPost, setListPost] = useState([]);
  useEffect(() => {
    axios
      .get("/post/getlistpostuser/" + id)
      .then((res) => {
        setListPost(res.data.listPost);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/user/getinfouser/" + id)
      .then((res) => {
        setName(res.data.user[0].name);
        setEmail(res.data.user[0].email);
        setAvatar(res.data.user[0].avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="shadow profile border p-3">
      <h3 className="text-center">Profile</h3>
      {id === userIdCurrent ? (
        <InfoUser friend={0} name={name} gmail={email} avatar={avatarCurrent}/>
      ) : (
        <InfoUser friend={1} name={name} gmail={email} id={id} avatar={avatar}/>
      )}

      <hr />
      <Suspense
        fallback={
          <div className="loading">
            <div className="spinner-border text-danger" role="status">
              <span className="sr-only text-center">Loading...</span>
            </div>
          </div>
        }
      >
        {id === userIdCurrent ? (
          <TabProfile listPost={listPost} friend={0} idUser={id}/>
        ) : (
          <TabProfile listPost={listPost} friend={1} idUser={id}/>
        )}
      </Suspense>
    </div>
  );
}
