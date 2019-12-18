import {
    ADD_TRANSFORMER_STAKEOUT,
    GET_TRANSFORMER_STAKEOUTS,
    DEL_TRANSFORMER_STAKEOUT,
    LOAD_TRANSFORMER_STAKEOUT,
    ADD_STAKEOUT_NODE,
    DEL_STAKEOUT_NODE,
    ADD_STAKEOUT_USER
} from '../types'

const initialState = {
    stakeouts: [],
    actualStakeOut: {
        transformer_id: null,
        nodes: [],
        users: [],
        chargues: []
    }
}

export default transformActivitiesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TRANSFORMER_STAKEOUTS:
            return {
                ...state,
                t_stakeouts: state.stakeouts.filter(stakeout => stakeout.transformer_id === action.transformer_id)
            }
        case ADD_TRANSFORMER_STAKEOUT:
            return {
                ...state,
                stakeouts: [...state.stakeouts, {
                    transformer_id: action.transformer_id,
                    users: [],
                    nodes: [],
                    chargues: []
                }],
                actualStakeOut: {
                    transformer_id: action.transformer_id,
                    users: [],
                    nodes: [],
                    chargues: []
                }
            }
        case DEL_TRANSFORMER_STAKEOUT:
            return {
                ...state,
                stakeouts: state.stakeouts.filter(s => s.transformer_id !== action.transformer_id),
                actualStakeOut: {}
            }
        case LOAD_TRANSFORMER_STAKEOUT:
            return {
                ...state,
                actualStakeOut: state.stakeouts.filter(s => s.transformer_id === action.transformer_id)[0]
            }
        case ADD_STAKEOUT_NODE:
            return {
                ...state,
                actualStakeOut: {
                    ...state.actualStakeOut,
                    nodes: [
                        ...state.actualStakeOut.nodes,
                        action.newNode
                    ]
                }
            }
        case DEL_STAKEOUT_NODE: 
            return {
                ...state,
                actualStakeOut: {
                    nodes: state.actualStakeOut.nodes.filter(n => n.number !== action.nodeNumber)
                }
            }
        case ADD_STAKEOUT_USER:
            return {
                ...state,
                actualStakeOut: {
                    ...state.actualStakeOut,
                    users: [
                        ...state.actualStakeOut.users,
                        action.newUser
                    ]
                }
            }
        default: 
            return state
    }
}