import React from "react";
import "./style.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="c-header">
          <span>Social Media App</span>
        <div className="profile d-flex">
          <span>Profile</span>
          <button>Signout</button>
        </div>
      </div>
    </div>
  );
}
