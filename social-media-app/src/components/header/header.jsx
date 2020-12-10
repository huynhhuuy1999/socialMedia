import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="c-header">
        <Link to="/" className="text-white"><span>Social Media App</span></Link>
          
        <div className="user d-flex">
          <Link to="/profile" className="text-white"><span>Profile</span></Link>
          <button>Signout</button>
        </div>
      </div>
    </div>
  );
}
