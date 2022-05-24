export const GET_DOGS = 'GET_DOGS';
export const FILTER_BY_TEMP = "FILTER_BY_TEMP" 
export const GET_TEMPS = 'GET_TEMPS'; 
export const MIN_WEIGHT = 'MIN_WEIGHT' 
export const MAX_WEIGHT = 'MAX_WEIGHT'
export const ORDER_NAME = 'ORDER_NAME'
export const ORDER_WEIGHT = 'ORDER_WEIGHT'
export const GET_DOG = 'GET_DOG'
export const POST_DOG = 'POST_DOG' 
export const GET_DETAIL = 'GET_DETAIL' 
export const CREATED = 'CREATED' 

const axios = require('axios');

// export function getDog(name){
//     return async function (dispatch){
//         try{
//             var json = await axios.get("http://localhost:3001/dogs?name=" + name)
//             return dispatch({ type: GET_DOG, payload:json.data})
//         }catch(error){
//             console.log(error)
//         }
//     }
// }

export const getDog = (name) => (dispatch) => {
    return fetch("http://localhost:3001/dogs?name=" + name)
    .then((response) => response.json())
    .then((json) => {dispatch({ type: GET_DOG, payload:json})})
}

export const getDogs = () => (dispatch) => {
    return fetch("http://localhost:3001/dogs")
    .then((response) => response.json())
    .then((json) => {dispatch({ type: GET_DOGS, payload:json})})
};

export const getTempes = () => (dispatch) => {
    return fetch("http://localhost:3001/temperament")
    .then((response) => response.json())
    .then((json) => {dispatch({ type: GET_TEMPS, payload:json})})
};

export function postDog (payload){
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/dog",payload)
        return response
    }
}

export function tempFilter(value){
    return{
        type: FILTER_BY_TEMP,
        payload: value
    }
}

export function minWeight(value){
    return{
        type: MIN_WEIGHT,
        payload: value
    }
}

export function maxWeight(value){
    return{
        type: MAX_WEIGHT,
        payload: value
    }
}

export function created(value){
    return{
        type: CREATED,
        payload: value
    }
}

export function orderName(value){
    return{
        type: ORDER_NAME,
        payload: value
    }
}

export function orderWeight(value){
    return{
        type: ORDER_WEIGHT,
        payload: value
    }
}

export function getDetail(id){
     return async function (dispatch){
//         return fetch("http://localhost:3001/dogs/" + id)
//     .then((response) => response.json())
//     .then((json) => {dispatch({ type: GET_DETAIL, payload:json})})
    
// };
        const response = await axios.get("http://localhost:3001/dogs/" + id)
        return dispatch({
            type: GET_DETAIL,
            payload: response.data
        })
    }
}
