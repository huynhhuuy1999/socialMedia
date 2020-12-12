import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import FormStatus from "../../features/formStatus/formStatus";
import NewFeed from "../../features/newFeed/newFeed";
import "./style.scss";

const BrownUser = lazy(() => import("../../features/brownUsers/brownUser"));

export default function Home() {
  const user = useSelector((state) => state.user.name);
  const empty = (
    <div className="empty w-50 shadow p-3">
      <h2 className="text-center">Login Please</h2>
    </div>
  );
  return (
    <div className="page-home h-100">
      {user === "" ? (
        empty
      ) : (
        <div className="row">
          <Suspense fallback={<div>Loading</div>}>
            <div className="col-md-9">
              <FormStatus />
            </div>
            <div className="col-md-3">
              <BrownUser />
            </div>
          </Suspense>
        </div>
      )}
    </div>
  );
}
