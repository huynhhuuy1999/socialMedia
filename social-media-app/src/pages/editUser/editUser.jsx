import { faCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/avatar/avatar";
import InputEditUser from "../../features/inputEditUser/inputEditUser";
import { editavatar, edituser } from "../../redux/actions/user.action";
import "./style.scss";

export default function EditUser() {
  const nameCurrent = useSelector((state) => state.user.name);
  const emailCurrent = useSelector((state) => state.user.email);
  const avatarCurrent = useSelector((state) => state.user.avatar);
  const userId = useSelector((state) => state.user.userId);
  const [name, setName] = useState(nameCurrent);
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState(emailCurrent);
  const alert = useAlert();
  const [selectedFile, setImg] = useState(null);
  const [x, setX] = useState(avatarCurrent);
  const dispatch = useDispatch();
  const handleSaveUser = () => {
    Axios.post("/user/edituser", {
      userId: userId,
      name: name,
      email: email,
    })
      .then((res) => {
        if (res.data.status === "success") {
          let user = {
            name: name,
            email: email,
          };
          const action = edituser(user);
          dispatch(action);
          alert.show("Saved");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (selectedFile !== null) {
      let formData = new FormData(); //formdata object
      formData.append("file", selectedFile, selectedFile.name); //append the values with key, value pair
      // formData.append("x",123456,"y");
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      Axios.post("/user/changeavatar", formData, config)
        .then((response) => {
          console.log(response);
          setX(response.data.filename);
          // console.log(response.data.filename);
          const action = editavatar(response.data.filename);
          dispatch(action);
          return response.data.filename;
        })
        .then((res) => {
          Axios.post("/user/saveavatar", {
            filename: res,
            userId: userId,
          })
            .then((res) => {})
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedFile]);

  const onChangeImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImg(img);
    }
  };
  return (
    <div className="shadow edit-user w-50 border p-3">
      <div className="icon-edit d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faPencilAlt} color="#FFF" />
      </div>
      <h3 className="text-center">Edit Profile</h3>
      <div className="change-ava d-flex flex-column align-items-center">
        <Avatar width={70} height={70} url={`http://localhost:9080/uploads/${x}`}/>
        {/* <button className="mt-2">Upload Image</button> */}
        <form>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              onChangeImg(e);
            }}
          />
        </form>
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
        <button className="w-50 mt-2 btn-save" onClick={() => handleSaveUser()}>
          Save
        </button>
      </div>
    </div>
  );
}
