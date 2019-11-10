import {
    ADD_TRANSFORMER_STAKEOUT,
    GET_TRANSFORMER_ACTIVITIES
} from '../types'

const initialState = {
    stakeouts: []
}

export default transformActivitiesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TRANSFORMER_STAKEOUT:
            return {
                ...state,
                transformers: action.transformers
            }
        default: 
            return state
    }
}