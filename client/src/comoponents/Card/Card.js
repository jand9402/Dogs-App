import React from "react";
import "./styles-card.css";
import { Link } from 'react-router-dom'

export default function Card({ id, image, name, temperament, minWeight, maxWeight }) {
    // let tempsFromDb = []
    // if(temperaments){
    //     temperament.map(temp => {
    //         tempsFromDb.push(temp.temperament)
    //     })
    // }
    let temperamentos = temperament
    let newArray = []
    for (let i = 0; i < temperamentos.length; i++) {
        if (temperamentos[0] === '#') {
            newArray = ['Empty']
        } else {
            let temp = temperamentos[i]
            newArray.push(temp)
        }
    }
    return (
        <div class="card" >
            <Link class="link-card" to={'/detail/' + id}>
                <img class="img-card" src={image} alt="dog img" />
            </Link>
            <div class="card-body">
                <h2 class="card-title">{name}</h2>
                <h3 class="card-weight">Weight: {minWeight} - {maxWeight} Kg</h3>
                <div class="container">
                <div class="row justify-content-center">
                <div class="col-auto">
                    <div class="dropdown">
                        <button class="btn-card-temps btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Temperaments
                        </button>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {newArray?.map((temp) => {
                                return (
                                    <li>
                                        {temp}
                                    </li>
                                )
                            }
                            )
                            }
                        </ul>
                    </div>
                </div>
                </div>
                </div>
            
            
            
            </div>
        </div>
    )
}