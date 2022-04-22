import React from "react";

export default function Card({image, name, temperament, weight}){
    return(
        <div>
            <img src={image} alt="dog img" width="200px" height="250px"/>
            <h2>{name}</h2>
            <h3>{weight}</h3>
            <h3>{temperament}</h3>
        </div>
    )
}