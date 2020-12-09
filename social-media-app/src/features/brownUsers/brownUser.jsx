import React from 'react'
import Avatar from '../../components/avatar/avatar'
import "./style.scss";

export default function BrownUser() {
    return (
        <div className="h-100">
            <div className="border p-2">
                <span>Browse Users</span>
            </div>
            <div className="list-browse-users border h-100">
                <div className="browse-item d-flex justify-content-between">
                    <div className="d-flex p-2 align-items-center">
                    <Avatar width={40} height={40}/>
                    <div className="name ml-1 mr-1">
                        John2
                    </div>
                    </div>
                    
                    <button>Follow</button>
                </div>
            </div>
        </div>
    )
}
