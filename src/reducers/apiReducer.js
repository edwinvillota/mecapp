import {ENDPOINT} from '../types'

const initialState = {
    url: 'http://192.168.0.15:5000/api'
}

export default apiReducer = (state = initialState, action) => {
    switch(action.type) {
        case ENDPOINT:
            return {
                ...state
            }
        default: 
            return state
    }
}