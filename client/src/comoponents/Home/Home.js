import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getDogs,
    getTempes,
    tempFilter,
    minWeight,
    maxWeight,
    orderName,
    orderWeight,
    created
} from '../../redux/actions'
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado'
import SerachBar from '../Nav/Nav'
import "./styles-home.css";


export default function Home() {


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
    }, [dispatch])

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])



    function handleClickRefresh(e) {
        e.preventDefault()
        dispatch(getDogs())
    }

    function handleFilterTemps(e) {
        //e.preventDefault()
        dispatch(tempFilter(e.target.value))
    }

    function handleMin(e) {
        dispatch(minWeight(e.target.value))
    }

    function handleMax(e) {
        dispatch(maxWeight(e.target.value))
    }

    function handleCreated(e) {
        dispatch(created(e.target.value))
    }

    function handlerSortName(e) {
        e.preventDefault()
        dispatch(orderName(e.target.value))
        setCurrentPage(1)
        setOrder(` ${e.target.value}`)
    }
    function handlerSortWeight(e) {
        e.preventDefault()
        dispatch(orderWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${e.target.value}`)
    }

    return (
        <div class="div-home">
            <div class="nav-div">
                <div class="row justify-content-center">
                    <div class="col-auto mt-4 mb-4">
                        <Link to='/create_dog'>
                            <button class="btn-create">Create dog</button>
                        </Link>
                    </div>
                    <div class="col-auto mt-4 mb-4">
                        <SerachBar />
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-auto mt-4 mb-4">
                        <button class="refresh" onClick={e => { handleClickRefresh(e) }}>Refresh</button>
                    </div>
                </div>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <span class="span">Order by Name</span>
                            <select class="form-select" onChange={e => { handlerSortName(e) }}>
                                <option value='asc-name'>Asce</option>
                                <option value='dsc-name'>Desc</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <span class="span">Order by Weight</span>
                            <select class="form-select" onChange={e => { handlerSortWeight(e) }}>
                                <option value='asc-weight'>Asce</option>
                                <option value='dsc-weight'>Desc</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <span class="span">Where come from</span>
                            <select class="form-select" onChange={e => { handleCreated(e) }}>
                                <option value='ALL'>All dogs</option>
                                <option value='API'>API</option>
                                <option value='Data Base'>Data Base</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <span class="span">Temperament</span>
                            <select class="form-select" onChange={e => { handleFilterTemps(e) }}>
                                <option value='All temperaments'>All temperaments</option>
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
                </div>
                <Paginado
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />
                <div class="container">
                    <div class="row ">
                        {currentDogs?.map((dog) => {
                            return (
                                <div class="col">


                                    <Card id={dog.id}
                                        name={dog.name}
                                        image={dog.image ? dog.image : 'https://th.bing.com/th/id/OIP.Bx3vNW9VjpIN8e7rbSP6twHaEV?pid=ImgDet&rs=1'}
                                        temperament={dog.temperament ? dog.temperament : dog.temperaments}
                                        minWeight={dog.minWeight} maxWeight={dog.maxWeight} />


                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}