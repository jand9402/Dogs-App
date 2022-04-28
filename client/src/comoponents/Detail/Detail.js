import React from "react";
import { getDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./styles-detail.css";


// export default function Detail(){

// let {id} = useParams()
//     return(
//         <div>{id}</div>
//     )
// }


export default function Detail(){
    //const dispatch = useDispatch()
    let {id} = useParams()
    const [detail, setDetail] = useState({})

    const getDet = async () => {
        const data = await axios.get(`http://localhost:3001/dogs/${id}`)
        setDetail(data.data)
        console.log(data.data)
    }
    useEffect( () => {
        getDet()
    },[])

    // useEffect(() => {
    //     dispatch(getDetail({id}))
    // },[dispatch])

   // const myDog = useSelector((state) => state.detail)
   
    // let temperamentos = detail[0].temperament
    // let newArray = []
    // for(let i = 0; i < temperamentos.length; i++){
    //     if(temperamentos[0] === '#'){
    //        newArray = ['Empty']
    //     }else{
    //         let temp = temperamentos[i]
    //     newArray.push(temp)}
    //     }
    return(
        <div class="father-div">
        <div class="div-detail">
            <Link to='/home'>
                <button class="button-home-detail" >Home</button>
            </Link>
            {
                detail.length > 0 ?
                <div class="div-detail-card">
                    <h2 class="name-detail">{detail[0].name}</h2>
                    <img class="img-detail" src={detail[0].image} alt="dog img" width="200px" height="250px"/>
                    <h3 class="weight-detail">Weight: {detail[0].minWeight} - {detail[0].maxWeight} Kg</h3>
                    <h3 class="height">Height: {detail[0].minheight} - {detail[0].maxheight} Cm</h3>
                    <h3 class="life_span_detail">Life: {detail[0].life_span}</h3>
                    <div class="temperaments-div"><h4 class="title-temps">Temperaments:</h4>
                    {Array.isArray(detail[0].temperament) ? detail[0].temperament.map((temp) => { 
                    // if(temp === '#'){
                    //     temp === 'Empty'
                    // }
                    return (
                        <h4 class="temps-detail" key={temp} value={temp}>
                            {temp}
                        </h4>
                    )}
                )  : <div class="temps-detail">Empty</div>
                }
                </div>
                    {/* <h3>{newArray?.map((temp) => { 
                    return (
                        <p>{temp}</p>
                    )}
                )  
                }</h3> */}
                </div>:<p class="loading">Loading</p>
            }
        </div>
        </div>
    )
}


