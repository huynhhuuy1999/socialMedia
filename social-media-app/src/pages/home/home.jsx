import React from "react";
import BrownUser from "../../features/brownUsers/brownUser";
import FormStatus from "../../features/formStatus/formStatus";
import NewFeed from "../../features/newFeed/newFeed";
import "./style.scss";

export default function Home() {
  return (
    <div className="page-home h-100">
      <div className="row">
        <div className="col-md-9">
          <FormStatus />
          <div className="mt-4">
            <NewFeed />
          </div>
        </div>
        <div className="col-md-3">
          <BrownUser />
        </div>
      </div>
    </div>
  );
}
