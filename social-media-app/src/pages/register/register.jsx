import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import InputEditUser from "../../features/inputEditUser/inputEditUser";
import "./style.scss";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [flagRegister, setFlagRegister] = useState(0);
  const handleRegister = (username, pass, name, email)=>{
    Axios.post("/user/register",{
      username:username,
      password:pass,
      name:name,
      email:email
    }).then(res=>{
      if(res.data.status === "success"){
        setFlagRegister(1);
      }
      else{
        alert("Register fail");
      }
    }).catch(err=>{console.log(err)});
  }
  return (
    <div className="register shadow border p-2">
      <h3 className="text-center">Register</h3>
      <div>
        <InputEditUser
          label="Username"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputEditUser
          label="Password"
          value={password}
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputEditUser
          label="Name"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <InputEditUser
          label="Email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="box-button">
          <button className="mt-2 btn-login" onClick={()=>handleRegister(username,password,name,email)}>
              Register
          </button>
          {flagRegister === 1 ? <Redirect to="/login" /> : ""}
        </div>
      </div>
    </div>
  );
}
