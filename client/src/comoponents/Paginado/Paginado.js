import React from "react";

export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumbers = []

    for(let i = 0; i <=Math.ceil(allDogs/dogsPerPage)-1; i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className="paginado">
                {
                    pageNumbers &&
                        pageNumbers.map(page => (
                            <li className="numero" key={page}>
                            <button onClick={() => paginado(page)}>{page}</button>
                            </li>
                        ))    
                }
            </ul>
        </nav>
    )
}