import { 
    GET_TRANSFORMER_STAKEOUTS,
    ADD_TRANSFORMER_STAKEOUT
} from '../types'

export const getTransformerStakeouts = () => {
    return {
        type: GET_TRANSFORMER_STAKEOUTS
    }
}

export const addTransformerStakeout = (stakeout) => {
    return {
        type: ADD_TRANSFORMER_STAKEOUT,
        stakeout
    }
}