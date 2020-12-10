import React from 'react'
import "./style.scss";
import image from "../../assets/18062020_2.jpg";

export default function Avatar(props) {
    return (
        <div className="ava">
            <img src={image} width={props.width} height={props.height}/>
        </div>
    );
}
