import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDog } from '../../redux/actions'
import "./styles-nav.css";

export default function SerachBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(a){
        a.preventDefault()
        setName(a.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDog(name))
        setName('')
    }

    return(
        <div>
           <input class="input-search"  onChange={e => {handleInputChange(e)}} type="text" placeholder="Search..."/>
           <button class="search" onClick={e => {handleSubmit(e)}} type="submit">Search</button>
        </div>
    )

}