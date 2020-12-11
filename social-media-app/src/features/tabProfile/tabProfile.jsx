import React, { lazy,Suspense } from "react";
import { Tabs } from "antd";
import "./style.scss";
// import Avatar from "../../components/avatar/avatar";
import Post from "../post/post";
const Avatar = lazy(() => import("../../components/avatar/avatar"));

const { TabPane } = Tabs;

export default function TabProfile() {
  return (
    <div className="tab-profile">
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="POSTS" key="1">
          <div className="post">
            <Post
              name="kathy"
              status="snskdja dasjdk lad kjdlaks djlasd sldjsal djldk ald jsladjsal dald ald jasld ajldasj dlj dl jksdhakjsd akd hakd"
              time="a month ago"
              count={5}
              friend={0}
            />
          </div>
        </TabPane>
        <TabPane tab="FOLLOWING" key="2">
          <Suspense fallback={<div>Loading</div>}>
            <div>
              <div>
                <Avatar width={40} height={40} />
                <span className="ml-2 fw-bold">jack</span>
              </div>
            </div>
          </Suspense>
        </TabPane>
        <TabPane tab="FOLLOWERS" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
}
