export const GET_DOGS = 'GET_DOGS';
export const FILTER_BY_TEMP = "FILTER_BY_TEMP" 
export const GET_TEMPS = 'GET_TEMPS'; 
export const MIN_WEIGHT = 'MIN_WEIGHT' 
export const MAX_WEIGHT = 'MAX_WEIGHT'

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
