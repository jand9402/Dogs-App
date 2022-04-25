import React from "react";

export default function Card({image, name, temperament, minWeight, maxWeight}){
    let temperamentos = temperament
    let newArray = []
    for(let i = 0; i < temperamentos.length; i++){
        if(temperamentos[0] === '#'){
           newArray = ['Empty']
        }else{
            let temp = temperamentos[i]
        newArray.push(temp)}
    }
    return(
        <div>
            <img src={image} alt="dog img" width="200px" height="250px"/>
            <h2>{name}</h2>
            <h3>{minWeight} - {maxWeight} Kg</h3>
            <h3>{newArray?.map((temp) => { 
                    return (
                        <p>{temp}</p>
                    )}
                )  
                }</h3>
        </div>
    )
}