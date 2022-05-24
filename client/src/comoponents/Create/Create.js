import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTempes } from '../../redux/actions/index'
import { useDispatch, useSelector } from "react-redux";
import "./styles-create.css";

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Name is required"
    }
    else if (!input.height) {
        errors.height = "Height is required"
    }
    else if (!input.minWeight) {
        errors.minWeight = "Min weight is required"
    }
    else if (!input.maxWeight) {
        errors.maxWeight = "Max weight is required"
    }
    else if (!input.temperament[0]) {
        errors.temperament = "At least two temperament are requiered"
    }
    return errors
}

export default function DogCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allTemps = useSelector((state) => state.temps)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        image: "",
        height: "",
        minWeight: "",
        maxWeight: "",
        life_span: "",
        temperament: []
    })

    function handleChange(e) {
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

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleDelete(temp) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temper => temper !== temp)
        })
    }


    function handleSubmit(e) {
        if (errors.name || errors.height || errors.minWeight || errors.maxWeight || errors.temperament) {
            alert('Must complete all required fields')
        }
        else {
            e.preventDefault()
            console.log(input)
            dispatch(postDog(input))
            alert("Dog created!")
            setInput({
                name: "",
                image: "",
                height: "",
                minWeight: "",
                maxWeight: "",
                life_span: "",
                temperament: []
            })
            history.push('/home')

        }
    }




    useEffect(() => {
        dispatch(getTempes())
    }, [dispatch])

    return (
        <div class="div-create">
            <div class="container">
                <div class="row justify-content-center mt-5">
                    <div class="col-auto mt-5">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-auto">
                                    <Link to='/home'>
                                        <button class="btn-home-create">Home</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <h1 class="create-title">Create new dog</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div class="row">
                                <div class="col">
                                    <label class="label">Name* </label>
                                </div>
                                <div class="col">
                                    <input class="input-text" onChange={(e) => handleChange(e)} type="text" value={input.name} name="name" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label class="label">Image</label>
                                </div>
                                <div class="col">
                                    <input class="input-text" onChange={(e) => handleChange(e)} type="text" value={input.image} name="image" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label class="label">Height* </label>
                                </div>
                                <div class="col">
                                    <input class="input-text" onChange={(e) => handleChange(e)} type="text" value={input.height} name="height" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label class="label">Min weight* </label>
                                </div>
                                <div class="col">
                                    <input class="input-text" onChange={(e) => handleChange(e)} type="text" value={input.minWeight} name="minWeight" />
                                </div>
                            </div>
                            <div class="row">
                            <div class="col">
                                <label class="label">Max weight* </label>
                                </div>
                                <div class="col">
                                <input class="input-text" onChange={(e) => handleChange(e)} type="text" value={input.maxWeight} name="maxWeight" />
                                </div>
                            </div>
                            <div class="row">
                            <div class="col">
                                <label class="label">Life span</label>
                                </div>
                                <div class="col">
                                <input class="input-text" onChange={(e) => handleChange(e)} type="text" value={input.life_span} name="life_span" />
                                </div>
                            </div>
                            <div class="row">
                            <div class="col">
                                <label class="label">Temperaments* </label>
                                </div>
                                <div class="col">
                                <select class="input-text" onChange={(e) => handleSelect(e)}>
                                    {allTemps?.map((temp) => {
                                        return (
                                            <option key={temp.temperament} value={temp.temperament}>
                                                {temp.temperament}
                                            </option>
                                        )
                                    }
                                    )
                                    }
                                </select>
                                </div>
                            </div>
                            <div class="container">
                            <div class="row justify-content-center mt-4">
                                <div class="col-auto">
                                {errors.name && (
                            <p class="erros">{errors.name}</p>
                        )}
                        {errors.height && (
                            <p class="erros">{errors.height}</p>
                        )}
                        {errors.minWeight && (
                            <p class="erros">{errors.minWeight}</p>
                        )}
                        {errors.maxWeight && (
                            <p class="erros">{errors.maxWeight}</p>
                        )}
                        {errors.temperament && (
                            <p class="erros">{errors.temperament}</p>
                        )}
                            <button class="btn-create-dog">Create Dog</button>
                            </div>
                            </div>
                            </div>
                        </form>
                        
                        <h3 class="temps-selecte">Temperaments selected</h3>
                        {input.temperament.map(temp =>
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-auto">
                                <p class="temperamet">{temp}</p>
                                </div>
                                <div class="col-auto">
                                <button class="button-delete" onClick={() => handleDelete(temp)}>Delete</button>
                            </div>
                            </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    )

}