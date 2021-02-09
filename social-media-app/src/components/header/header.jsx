import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/user.action";
import "./style.scss";

export default function Header() {
  const name = useSelector((state) => state.user.name);
  const userId = useSelector(state=>state.user.userId);
  const urlProfile = `/profile/${userId}`;
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    const action = logout();
    dispatch(action);
  }
  return (
    <div className="header">
      <div className="c-header">
        <Link to="/" className="text-white c-header-link">
          <span>Social Media App</span>
        </Link>

        <div className="user d-flex">
          <Link to={urlProfile} className="text-white c-header-link">
            <span>{name}</span>
          </Link>
          <Link to="/login">
            <button onClick={()=>handleLogout()}>Signout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
