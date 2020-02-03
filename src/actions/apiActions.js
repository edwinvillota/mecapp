import {
    SET_API_IP
} from '../types'

export const setApiIp = (newApiIp) => {
    return {
        type: SET_API_IP,
        newApiIp
    }
} 