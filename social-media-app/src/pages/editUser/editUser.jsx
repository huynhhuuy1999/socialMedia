import { faCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../components/avatar/avatar";
import InputEditUser from "../../features/inputEditUser/inputEditUser";
import "./style.scss";

export default function EditUser() {
  const nameCurrent = useSelector((state) => state.user.name);
  const emailCurrent = useSelector((state) => state.user.email);
  const [name, setName] = useState(nameCurrent);
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState(emailCurrent);
  return (
    <div className="shadow edit-user w-50 border p-3">
      <div className="icon-edit d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faPencilAlt} color="#FFF" />
      </div>
      <h3 className="text-center">Edit Profile</h3>
      <div className="change-ava d-flex flex-column align-items-center">
        <Avatar width={70} height={70} />
        <button className="mt-2">Upload Image</button>
      </div>
      <div className="list-input">
        <InputEditUser
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <InputEditUser
          label="About"
          value={about}
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        />
        <InputEditUser
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button className="w-50 mt-2 btn-save">Save</button>
      </div>
    </div>
  );
}
