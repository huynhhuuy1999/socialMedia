import React, { useState } from "react";
import Avatar from "../../components/avatar/avatar";
import "./style.scss";

export default function FormStatus() {
  const [status, setStatus] = useState("");
  return (
    <div className="form-status border">
      <div className="header-form-status d-flex p-2">
        {/* <div className="ava">
          <span>HN</span>
        </div> */}
        <Avatar width={30} height={30}/>
        <span className="name">Jenny</span>
      </div>
      <div className="c-input-status p-2">
        <span>Add a status</span><br/>
        <input type="text" className="p-2" placeholder="What's on your mind," onChange={(e) => setStatus(e.target.value)} />
      </div>
      <div>
        <div className="icon-photo p-2">
          <span>icon photo</span>
        </div>
      </div>
      <div className="footer-form-status p-2">
        <button>Post</button>
      </div>
    </div>
  );
}
