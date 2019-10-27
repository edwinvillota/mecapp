import {ENDPOINT} from '../types'

const initialState = {
    url: 'http://181.62.161.186:5000/api'
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