import React from "react";
import "./styles-paginado.css";


export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumbers = []

    for(let i = 0; i <=Math.ceil(allDogs/dogsPerPage)-1; i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav id="menu">
            <ul className="paginado">
                {
                    pageNumbers &&
                        pageNumbers.map(page => (
                            <li key={page}>
                            <button class="nav-btn" onClick={() => paginado(page)}>{page}</button>
                            </li>
                        ))    
                }
            </ul>
        </nav>
    )
}