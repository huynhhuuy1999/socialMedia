import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";

export default function Header() {
  const name = useSelector((state) => state.user.name);
  const userId = useSelector(state=>state.user.userId);
  const urlProfile = `/profile/${userId}`;
  return (
    <div className="header">
      <div className="c-header">
        <Link to="/" className="text-white">
          <span>Social Media App</span>
        </Link>

        <div className="user d-flex">
          <Link to={urlProfile} className="text-white">
            <span>{name}</span>
          </Link>
          <Link to="/login">
            <button>Signout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
