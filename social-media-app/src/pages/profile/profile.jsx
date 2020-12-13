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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const [listPost, setListPost] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9080/post/getlistpostuser/" + id)
      .then((res) => {
        setListPost(res.data.listPost);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:9080/user/getinfouser/" + id)
      .then((res) => {
        setName(res.data.user[0].name);
        setEmail(res.data.user[0].email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="shadow w-50 profile border p-3">
      <h3 className="text-center">Profile</h3>
      {id === userIdCurrent ? (
        <InfoUser friend={0} name={name} gmail={email} />
      ) : (
        <InfoUser friend={1} name={name} gmail={email} id={id} />
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
