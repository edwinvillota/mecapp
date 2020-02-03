import { 
    GET_ALL_TRANSFORMERS,
    GET_TRANSFORMER_DATA,
    SET_TRANSFORMER_REQUEST_STATUS,
    SET_TRANSFORMER_USER_STATUS,
} from '../types'

const initialState = {
    transformers: [],
    requestStatus: 'WAITING',
    transformer_data: {}
}

export default balanceReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_TRANSFORMERS:
            return {
                ...state,
                requestStatus: 'SUCESSS',
                transformers: action.transformers
            }
        case GET_TRANSFORMER_DATA:
            return {
                ...state,
                requestStatus: 'SUCCESS',
                transformer_data: action.transformer_data
            }
        case SET_TRANSFORMER_REQUEST_STATUS:
            return {
                ...state,
                requestStatus: action.newStatus
            }
        case SET_TRANSFORMER_USER_STATUS:
            return {
                ...state,
                transformer_data: {
                    ...state.transformer_data,
                    users: action.newUsers
                }
            }
        default:
            return state
    }
}

