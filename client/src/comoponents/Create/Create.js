import React, { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTempes } from '../../redux/actions/index'
import { useDispatch, useSelector } from "react-redux";
import "./styles-create.css";

function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = "Name is required"
    }
    else if(!input.height){
        errors.height = "Height is required"
    }
    else if(!input.minWeight){
        errors.minWeight = "Min weight is required"
    }
    else if(!input.maxWeight){
        errors.maxWeight = "Max weight is required"
    }
    else if(!input.temperament[0]){
        errors.temperament = "At least two temperament are requiered"
    }
    return errors
}

export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const allTemps = useSelector((state) => state.temps)
    const [errors, setErrors] = useState({})

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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleDelete(temp){
        setInput({
            ...input,
            temperament: input.temperament.filter(temper => temper !== temp)
        })
    }


    function handleSubmit(e){
        if(errors.name || errors.height || errors.minWeight || errors.maxWeight || errors.temperament){
            alert('Must complete all required fields')
        }
         else{
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
    }

   
    

    useEffect(() => {
        dispatch(getTempes())
    },[dispatch])

    return(
        <div class="div-create">
            <div class="div-form-created">
            <Link to='/home'>
            <button class="btn-home-create">Home</button>
            </Link>
            <h1 class="create-title">Create new dog</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label class="label">Name* </label>
                    <input class="input-text" onChange={(e) => handleChange(e)} type="text" value={input.name} name="name"/>
                    {errors.name && (
                        <p class="erros-name">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label class="label">Image</label>
                    <input class="input-text"  onChange={(e) => handleChange(e)} type="text" value={input.image} name="image"/>
                </div>
                <div>
                    <label class="label">Height* </label>
                    <input class="input-text"  onChange={(e) => handleChange(e)} type="text" value={input.height} name="height"/>
                    {errors.height && (
                        <p class="erros-height">{errors.height}</p>
                    )}
                </div>
                <div>
                    <label class="label">Min weight* </label>
                    <input class="input-text"  onChange={(e) => handleChange(e)} type="text" value={input.minWeight} name="minWeight"/>
                    {errors.minWeight && (
                        <p class="erros-min-weight">{errors.minWeight}</p>
                    )}
                </div>
                <div>
                    <label class="label">Max weight* </label>
                    <input class="input-text"  onChange={(e) => handleChange(e)} type="text" value={input.maxWeight} name="maxWeight"/>
                    {errors.maxWeight && (
                        <p class="erros-max-weight">{errors.maxWeight}</p>
                    )}
                </div>
                <div>
                    <label class="label">Life span</label>
                    <input class="input-text"  onChange={(e) => handleChange(e)} type="text" value={input.life_span} name="life_span"/>
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
                <label class="label">Temperaments* </label>
                <select class="input-text"  onChange={(e) => handleSelect(e)}>
                    {allTemps?.map((temp) => { 
                    return (
                        <option key={temp.temperament} value={temp.temperament}>
                            {temp.temperament}
                        </option>
                    )}
                )  
                } 
                </select>
                
                
                {/* <ul><li>{input.temperament.map(temp =>  temp + "- ")}</li></ul> */}
                {errors.temperament && (
                        <p class="erros-temperaments">{errors.temperament}</p>
                    )}
                </div>
                <button class="btn-create-dog">Create Dog</button>
            </form>
            <h3 class="temps-selecte">Temperaments selected</h3>
            {input.temperament.map(temp => 
                    <div>
                        <p class="temperamet">{temp}</p>
                        <button class="button-delete" onClick={() => handleDelete(temp)}>Delete</button>
                    </div>)}
                    </div>
        </div>
    )
    
}