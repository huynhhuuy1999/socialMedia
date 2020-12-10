import React from 'react'
import InfoUser from '../../features/infoUser/infoUser';
import TabProfile from '../../features/tabProfile/tabProfile';
import "./style.scss";

export default function Profile() {
    return (
        <div className="shadow w-50 profile border p-3">
            <h3 className="text-center">Profile</h3>
            <InfoUser friend={0} name="Kathy" gmail="abc@gmail.com"/>
            <hr/>
            <TabProfile/>
        </div>
    )
}
