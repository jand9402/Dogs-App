import { GET_DOGS, 
         GET_DOG,
         GET_TEMPS, 
         FILTER_BY_TEMP, 
         MIN_WEIGHT, 
         MAX_WEIGHT,
         ORDER_NAME, 
         ORDER_WEIGHT,
         POST_DOG,
         GET_DETAIL,
         CREATED
        } from "../actions";


const initialState = {
    dogsAll: [],
    dogsAll2: [],
    dogsAll3: [],
    dogsAll4: [],
    dogsAll5: [],
    dogs: [],
    temps: [],
    detail: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                dogsAll: action.payload,
                dogsAll2: action.payload,
                dogsAll3: action.payload,
                dogsAll4: action.payload,
                dogsAll5: action.payload
            }
            case GET_DOG:
            return{
                ...state,
                dogs: action.payload,
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
            const weightmin = action.payload
             const minWeightFilter = weightmin === 'All weights' ? allDogs2 : allDogs2.filter((dog) => {
                if(Number(dog.minWeight) >= Number(action.payload)) return true})
            
            return{
                ...state, 
                dogs: minWeightFilter
            }

            case MAX_WEIGHT:
            const allDogs3 = state.dogsAll
            const weightmax = action.payload
            const maxWeightFilter = weightmax === 'All weights' ? allDogs3 :allDogs3.filter((dog) => {
                if(Number(dog.maxWeight) <= Number(action.payload)) return true})
            
            return{
                ...state, 
                dogs: maxWeightFilter
            }
            case CREATED:
            const allDogs4 = state.dogsAll
            const created = action.payload
            if(created === 'ALL'){
                return{
                    ...state, 
                    dogs: allDogs4
                }
            }
            else{
            const whereCreated = created === 'API' ? allDogs4.filter((dog) => !dog.created):allDogs4.filter((dog) => dog.created)
            return{
                ...state, 
                dogs: whereCreated
            }
        }
            case ORDER_NAME:
                let nameSort = state.dogsAll2
                let sortName = action.payload === 'asc-name' ?
                nameSort.sort(function(a, b){
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name){
                        return -1
                    }
                    return 0
                }) :
                nameSort.sort(function(a, b){
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name){
                        return 1
                    }
                    return 0
                })
            return{
                ...state,
                dogs: sortName
            }
            case ORDER_WEIGHT:
                let weightSort = state.dogsAll2
                let sortWeight = action.payload === 'asc-weight' ?
                weightSort.sort(function(a, b){
                    return a.minWeight - b.minWeight
                }) :
                weightSort.sort(function(a, b){
                    return b.minWeight - a.minWeight
                })
            return{
                ...state,
                dogs: sortWeight
            }
            case POST_DOG:
                return{
                    ...state,
                    //dogs: [...state.dogs, action.payload]
                }
            case GET_DETAIL:
                return{
                    ...state,
                    detail: action.payload
                }
            default: return{...state}
       
    };
};

export default rootReducer;
