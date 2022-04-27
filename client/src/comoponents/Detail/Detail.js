import React from "react";
import { getDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from 'react-router'

export default function Detail(){
    const id = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetail(id.id))
    },[dispatch])
    const myDog = useSelector((state) => state.detail)


    let temperamentos = myDog.temperament 
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
            <Link to='/home'>
                <button>Home</button>
            </Link>
            {
                myDog.length > 0 ?
                <div>
                    <img src={myDog[0].image} alt="dog img" width="200px" height="250px"/>
                    <h2>{myDog[0].name}</h2>
                    <h3>{myDog[0].minWeight} - {myDog[0].maxWeight} Kg</h3>
                    <h3>{myDog[0].minHeight} - {myDog[0].maxHeight} Cm</h3>
                    <h3>{myDog[0].life_span}</h3>
                    <h3>{newArray?.map((temp) => { 
                    return (
                        <p>{temp}</p>
                    )}
                )  
                }</h3>
                </div>:<p>Loading</p>
            }
        </div>
    )
}


