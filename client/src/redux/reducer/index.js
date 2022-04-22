import { GET_DOGS, GET_TEMPS, FILTER_BY_TEMP, MIN_WEIGHT, MAX_WEIGHT } from "../actions";


const initialState = {
    dogsAll: [],
    dogs: [],
    dog: {},
    temps: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                dogsAll: action.payload
            }
        case GET_TEMPS:
            return{
                ...state,
                temps: action.payload
            }
        case FILTER_BY_TEMP:
            const allDogs = state.dogsAll
            const temp = action.payload
            const dogFilter = temp === 'All temperaments' ? allDogs : allDogs.filter((dog) => dog.temperament.includes(temp))
           return{
               ...state, 
               dogs: dogFilter
           }
           case MIN_WEIGHT:
            const allDogs2 = state.dogsAll
            const minWeightFilter = allDogs2.filter((dog) => {
                {let allWeight = dog.weight
                if(allWeight){
                    let minWeight = allWeight.split("")
                    let minArray = []
                    for(let i = 0; i < 2; i++){
                        if(minArray[1] === " "){
                            continue
                        }
                        minArray.push(minWeight[i])
                    }
                    
                    var minMin = minArray.join("")
                    
                }
                if(minMin >= Number(action.payload)) return true}
            })
            return{
                ...state, 
                dogs: minWeightFilter
            }

            case MAX_WEIGHT:
            const allDogs3 = state.dogsAll
            const maxWeightFilter = allDogs3.filter((dog) => {
                {let allWeight = dog.weight
                if(allWeight){
                    let maxWeight = allWeight.split("")
                    let lastDigit = maxWeight.slice(-5)
                    let maxArray = []
                    for(let i = 0; i < 2; i++){
                        if(maxArray[1] === "N"){
                            continue
                        }
                        maxArray.push(lastDigit[i])
                    }
                    
                    var maxMax = maxArray.join("")
                    
                }
                if(maxMax <= Number(action.payload)) return true}
            })
            return{
                ...state, 
                dogs: maxWeightFilter
            }
            default: return{...state}
       
    };
};

export default rootReducer;
