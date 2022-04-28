import React from "react";
import "./styles-card.css";

export default function Card({id, image, name, temperament, minWeight, maxWeight}){
    // let tempsFromDb = []
    // if(temperaments){
    //     temperament.map(temp => {
    //         tempsFromDb.push(temp.temperament)
    //     })
    // }
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
        <div class="div-card">
            <div class="otro-div">
            <h2 class="name">{name}</h2>
            <img class="img-card" src={image} alt="dog img"/>
            <h3 class="weight">Weight: {minWeight} - {maxWeight} Kg</h3>
            <h3 class="temperaments">Temperaments: {newArray?.map((temp) => { 
                    return (
                        <h4>{temp}</h4>
                    )}
                )  
                }</h3>
            </div>
        </div>
    )
}