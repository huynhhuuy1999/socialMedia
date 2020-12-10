import React from 'react'
import "./style.scss"

export default function InputEditUser(props) {
    return (
        <div className="mb-4">
           <label className="fs-1">{props.label}</label><br/>
           <input type="text" value={props.value} placeholder={props.placeholder} onChange={props.onChange}/>
        </div>
    )
}
