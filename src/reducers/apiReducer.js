import {
    ENDPOINT,
    SET_API_IP
} from '../types'

const initialState = {
    url: 'http://192.168.0.16:5000/api'
}

export default apiReducer = (state = initialState, action) => {
    switch(action.type) {
        case ENDPOINT:
            return {
                ...state
            }
        case SET_API_IP:
            return {
                ...state,
                url: action.newApiIp
            }
        default: 
            return state
    }
}