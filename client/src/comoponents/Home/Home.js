import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getDogs, getTempes, tempFilter, minWeight, maxWeight, orderName, orderWeight } from '../../redux/actions'
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado'


export default function Home(){

    
    const dispatch = useDispatch()
   
    const allDogs = useSelector((state) => state.dogs)
    const allTemps = useSelector((state) => state.temps)
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const lastDog = currentPage * dogsPerPage
    const firstDog = lastDog - dogsPerPage
    const currentDogs = allDogs.slice(firstDog, lastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getTempes())
    },[dispatch])

    useEffect(() => {
        dispatch(getDogs())
    },[dispatch])


    
    function handleClickRefresh(e){
        e.preventDefault()
        dispatch(getDogs())
    }

    function handleFilterTemps(e){
        //e.preventDefault()
        dispatch(tempFilter(e.target.value))
    }

    function handleMin(e){
        dispatch(minWeight(e.target.value))
    }

    function handleMax(e){
        dispatch(maxWeight(e.target.value))
    }
    function handlerSortName(e){
        e.preventDefault()
        dispatch(orderName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${e.target.value}`)
    }
    function handlerSortWeight(e){
        e.preventDefault()
        dispatch(orderWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${e.target.value}`)
    }

    return(
        <div>
            <Link to= '/create_dog'>
                <button>Create dog</button>
            </Link>
            <h1>Doggys</h1>
            <button onClick={e => {handleClickRefresh(e)}}>Refresh</button>
            <div>
                <span>Order by Name</span>
                <select onChange={e => {handlerSortName(e)}}>
                    <option value='asc-name'>Asce</option>
                    <option value='dsc-name'>Desc</option>
                </select>
                <span>Order by Weight</span>
                <select  onChange={e => {handlerSortWeight(e)}}>
                    <option value='asc-weight'>Asce</option>
                    <option value='dsc-weight'>Desc</option>
                </select>
                <span>Min weight</span>
                <select onChange={e => {handleMin(e)}}>
                    <option value='All weights'>All weights</option>
                    <option value='1 '>1 Kg</option>  
                    <option value='5'>5 Kg</option>
                    <option value='10'>10 Kg</option>
                    <option value='15'>15 Kg</option>
                    <option value='20'>20 Kg</option>
                    <option value='25'>25 Kg</option>
                    <option value='30'>30 Kg</option>
                    <option value='35'>35 Kg</option>
                    <option value='40'>40 Kg</option>
                </select>
                <span>Max weight</span>
                <select onChange={e => {handleMax(e)}}>  
                    <option value='All weights'>All weights</option>
                    <option value='5'>5 Kg</option>
                    <option value='10'>10 Kg</option>
                    <option value='15'>15 Kg</option>
                    <option value='20'>20 Kg</option>
                    <option value='25'>25 Kg</option>
                    <option value='30'>30 Kg</option>
                    <option value='35'>35 Kg</option>
                    <option value='40'>40 Kg</option>
                    <option value='50'>50 Kg</option>
                    <option value='99'>60 + Kg</option>
                </select>
                <span>Temperament</span>
                <select onChange={e => {handleFilterTemps(e)}}>
                <option value='All temperaments'>All temperaments</option>
                {allTemps?.map((temp) => { 
                    return (
                        <option value={temp.temperament}>
                            {temp.temperament}
                        </option>
                    )}
                )  
                }
                </select>
                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
                {currentDogs?.map((dog) => {
                    return (
                        <Fragment>
                            <Link to={"/home/"+dog.name}>
                            <Card name={dog.name} image={dog.image.url} temperament={dog.temperament} minWeight={dog.minWeight} maxWeight={dog.maxWeight} />
                            </Link>
                        </Fragment>
                    )
                })  
                }
            </div>
        </div>
    )
}