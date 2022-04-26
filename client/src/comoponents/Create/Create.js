import React, { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTempes } from '../../redux/actions/index'
import { useDispatch, useSelector } from "react-redux";


export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const allTemps = useSelector((state) => state.temps)

    const [input, setInput] = useState({
        name:"",
        image:"",
        height:"",
        minWeight:"",
        maxWeight:"",
        life_span:"",
        temperament:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // function handleCheck(e){
    //     if(e.target.checked){
    //         setInput({
    //             ...input,
    //             temperament: [...input.ocupation, e.target.value]
    //         })
    //     }
    // }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        dispatch(postDog(input))
        alert("Dog created!")
        setInput({
            name:"",
            image:"",
            height:"",
            minWeight:"",
            maxWeight:"",
            life_span:"",
            temperament:[]
        })
        history.push('/home')
    }

    

    useEffect(() => {
        dispatch(getTempes())
    },[dispatch])

    return(
        <div>
            <Link to='/home'>
            <button>Home</button>
            </Link>
            <h1>Cereate new dog</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input onChange={(e) => handleChange(e)} type="text" value={input.name} name="name"/>
                </div>
                <div>
                    <label>Image</label>
                    <input onChange={(e) => handleChange(e)} type="text" value={input.image} name="image"/>
                </div>
                <div>
                    <label>Height</label>
                    <input onChange={(e) => handleChange(e)} type="text" value={input.height} name="height"/>
                </div>
                <div>
                    <label>Min weight</label>
                    <input onChange={(e) => handleChange(e)} type="text" value={input.minWeight} name="minWeight"/>
                </div>
                <div>
                    <label>Man weight</label>
                    <input onChange={(e) => handleChange(e)} type="text" value={input.maxWeight} name="maxWeight"/>
                </div>
                <div>
                    <label>Life span</label>
                    <input onChange={(e) => handleChange(e)} type="text" value={input.life_span} name="life_span"/>
                </div>
                <div>
                {/* <label>Temperaments</label>
                    {allTemps?.map((temp) => { 
                    return (
                        <div>
                        <label>{temp.temperament}
                         <input type="checkbox" value={temp.temperament}/>
                        </label> 
                        </div>
                            
                    )}
                )  
                }                    */}
                <label>Temperaments</label>
                <select onChange={(e) => handleSelect(e)}>
                    {allTemps?.map((temp) => { 
                    return (
                        <option value={temp.temperament}>
                            {temp.temperament}
                        </option>
                    )}
                )  
                } 
                </select>
                <ul><li>{input.temperament.map(temp =>  temp + "- ")}</li></ul>
                </div>
                <button>Create Dog</button>
            </form>
        </div>
    )
    
}