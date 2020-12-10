import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/avatar/avatar";
import "./style.scss";

export default function InfoUser(props) {
  const icon = (
    <div>
      <Link to="/edit">
        <FontAwesomeIcon icon={faPencilAlt} />
      </Link>
      <br />
      <FontAwesomeIcon icon={faTrash} color="red" />
    </div>
  );
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <Avatar width={50} height={50} />
        <div className="pl-2 pr-2">
          <span>{props.name}</span>
          <br />
          <span>{props.gmail}</span>
        </div>
      </div>

      <div>
        {props.friend === 1 ? (
          <button className="btn-follow">FOLLOW</button>
        ) : (
          icon
        )}
      </div>
    </div>
  );
}
