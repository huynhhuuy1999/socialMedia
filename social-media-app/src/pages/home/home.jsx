import React, { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/loading";
import classnames from "classnames";
import "./style.scss";

const FormStatus = lazy(() => import("../../features/formStatus/formStatus"));
const BrownUser = lazy(() => import("../../features/brownUsers/brownUser"));

export default function Home() {
  const user = useSelector((state) => state.user.name);
  const [display, setDisplay] = useState(false);
  const empty = (
    <div className="empty w-50 shadow p-3">
      <h2 className="text-center">Login Please</h2>
    </div>
  );
  const handleDisplayBrownUser = () => {
    setDisplay(!display);
  };
  return (
    <div className="page-home h-100">
      {user === "" ? (
        empty
      ) : (
        <>
          <div className="row">
            <Suspense
              fallback={
                <div className="loading">
                  <div className="spinner-border text-danger" role="status">
                    <span className="sr-only text-center">Loading...</span>
                  </div>
                </div>
              }
            >
              <div className="col-md-9 x">
                <FormStatus />
              </div>

              <div className="col-md-3 y">
                <BrownUser />
              </div>
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
