import {ENDPOINT} from '../types'

const initialState = {
    url: 'http://10.0.2.2:5000/api'
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