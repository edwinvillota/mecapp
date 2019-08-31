import { 
    GET_ALL_TRANSFORMERS 
} from '../types'

const initialState = {
    transformers: [],
    requestStatus: 'WAITING'
}

export default balanceReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_TRANSFORMERS:
            return {
                ...state,
                requestStatus: 'SUCESSS',
                transformers: action.transformers
            }
        default:
            return state
    }
}

