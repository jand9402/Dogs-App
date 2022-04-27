import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getDogs, 
         getTempes, 
         tempFilter, 
         minWeight, 
         maxWeight, 
         orderName, 
         orderWeight,
         created } from '../../redux/actions'
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado'
import SerachBar from '../Nav/Nav'


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

    function handleCreated(e){
        dispatch(created(e.target.value))
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
                <SerachBar/>
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
                <span>Where come from</span>
                <select onChange={e => {handleCreated(e)}}>
                    <option value='ALL'>All dogs</option>  
                    <option value='API'>API</option>
                    <option value='Data Base'>Data Base</option>
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
                    //console.log(dog.temperaments)
                    //console.log(dog)
                    // var este = JSON.parse(dog.temperaments)
                    // console.log(este)

                    // // console.log(dog.temperaments)
                    //  var newTemp = Object.assign({}, dog.temperaments)
                    // //console.log(newTemp)
                    // // var arrayTemps = []
                    // for(let i = 0; i < newTemp.length; i++){
                    //     console.log(newTemp[i])
                    // }
                    // // newTemp.map(obj => {
                    // //     obj.map(obj2 => {
                    //         arrayTemps.push (newTemp)
                    // //     })
                    // // })
                    // console.log(arrayTemps)
                    // var ob1 = Object.assign({}, newTemp[0])
                    //console.log(newTemp[1])
                    //console.log(newTemp[2])
                    // console.log(ob1['temperament'])

                    // let mapeado = newTemp.map(el => console.log(el))

                    // let newTemp2 = JSON.stringify(newTemp)
                    // console.log(newTemp2)

                    // let newTemp3 = JSON.parse(newTemp2)
                    // console.log(newTemp3.length)

                    // for(let ob in newTemp3){
                    //     console.log(ob)
                    // }
                    // for(let ob in newTemp){
                    //     var algo = Object.assign({}, ob)
                    //     console.log(algo)
                    // }
                    // let newTempParse = JSON.parse(newTemp)
                    // console.log(newTempParse)

                    // console.log(dog.temperaments)
                    // for(var ob in dog.temperaments){
                    //     console.log(ob.temperament)
                    // }
                    
                    return (
                        <Fragment>
                            <Link to= {'/home/' + dog.id}>
                            <Card name={dog.name} image={dog.image ? dog.image : 'https://th.bing.com/th/id/OIP.Bx3vNW9VjpIN8e7rbSP6twHaEV?pid=ImgDet&rs=1'} temperament={dog.temperament ? dog.temperament : dog.temperaments} minWeight={dog.minWeight} maxWeight={dog.maxWeight} />
                            </Link>
                        </Fragment>
                    )
                })  
                }
            </div>
        </div>
    )
}