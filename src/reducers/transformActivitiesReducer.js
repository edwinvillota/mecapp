import {
    ADD_TRANSFORMER_STAKEOUT,
    GET_TRANSFORMER_STAKEOUTS,
    DEL_TRANSFORMER_STAKEOUT,
    LOAD_TRANSFORMER_STAKEOUT,
    ADD_STAKEOUT_NODE,
    DEL_STAKEOUT_NODE,
    ADD_STAKEOUT_USER,
    DEL_STAKEOUT_USER,
    UPDATE_TRANSFORMER_STAKEOUT
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
            let exists = false
            state.stakeouts.forEach(s => {
                if (s.transformer_id === action.transformer_id) {
                    exists = true
                }
            })
            if (!exists && action.transformer_id !== undefined) {
                return {
                    ...state,
                    stakeouts: [
                        ...state.stakeouts,
                        {
                            transformer_id: action.transformer_id,
                            users: [],
                            nodes: [],
                            chargues: []                        
                        }
                    ],
                    actualStakeOut: {
                        transformer_id: action.transformer_id,
                        users: [],
                        nodes: [],
                        chargues: []
                    }
                }
            }
        case DEL_TRANSFORMER_STAKEOUT:
            return {
                ...state,
                stakeouts: state.stakeouts.filter(s => s.transformer_id !== action.transformer_id),
                actualStakeOut: {}
            }
        case LOAD_TRANSFORMER_STAKEOUT:
            if (state.stakeouts.filter(s => s.transformer_id === action.transformer_id).length) {
                return {
                    ...state,
                    actualStakeOut: state.stakeouts.filter(s => s.transformer_id === action.transformer_id).pop()
                }
            } else {
                return {
                    ...state,
                    actualStakeOut: {
                        transformer_id: action.transformer_id,
                        users: [],
                        nodes: [],
                        chargues: []
                    }
                }
            }
        case UPDATE_TRANSFORMER_STAKEOUT:
            return {
                ...state,
                stakeouts: state.stakeouts.map(s => {
                    if (s.transformer_id === action.transformer_id) {
                        return state.actualStakeOut
                    } else {
                        return s
                    }
                })
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
        case DEL_STAKEOUT_USER:
            return {
                ...state,
                actualStakeOut: {
                    ...state.actualStakeOut,
                    users: state.actualStakeOut.users.filter(u => u.info.meter !== action.user.info.meter && u.info.brand !== action.user.info.brand)
                }
            }
        default: 
            return state
    }
}