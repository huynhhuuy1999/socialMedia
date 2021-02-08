import React, { useState } from "react";
import axios from "axios";
import InputEditUser from "../../features/inputEditUser/inputEditUser";
import "./style.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/user.action";
import { Link, Redirect } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("huuhuu1999");
  const [pass, setPass] = useState("123456");
  const [flagLogin, setFlagLogin] = useState(0);
  const dispatch = useDispatch();
  const handleLogin = (username, pass) => {
    axios
      .post("/user/login", {
        username: username,
        password: pass,
      })
      .then((res) => {
        if (res.data.status === "success") {
          const user = {
            username: username,
            password: pass,
            name: res.data.user[0].name,
            email: res.data.user[0].email,
            userId: res.data.user[0]._id,
            avatar:res.data.user[0].avatar
          };
          const action = login(user);
          dispatch(action);
          setFlagLogin(1);
        } else {
          alert("Dang nhap khong thanh cong");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="border login shadow p-3">
      <h3 className="text-center">LOGIN</h3>
      <InputEditUser
        label="Username"
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputEditUser
        label="Password"
        value={pass}
        placeholder="add password"
        type="password"
        onChange={(e) => setPass(e.target.value)}
      />
      <div className="box-button">
        <button
          className="mt-2 btn-login"
          onClick={() => handleLogin(username, pass)}
        >
          Login
        </button>

        <button className="mt-2 btn-login">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>

        {flagLogin === 1 ? <Redirect to="/" /> : ""}
      </div>
    </div>
  );
}
