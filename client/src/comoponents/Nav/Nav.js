import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDog } from '../../redux/actions'

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
           <input  onChange={e => {handleInputChange(e)}} type="text" placeholder="Search..."/>
           <button onClick={e => {handleSubmit(e)}} type="submit">Search</button>
        </div>
    )

}