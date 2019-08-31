import {LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from '../types'

const initialState = {
    isRequesting: false,
    isAuthenticated: false,
    status: false,
    error: false,
    data: false
}

export default authenticationReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isRequesting: true,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isRequesting: false,
                isAuthenticated: false,
                status: 'FAIL',
                error: action.error,
                data: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                isAuthenticated: true,
                status: 'SUCCESS',
                error: false,
                data: action.data
            }
        case LOGOUT:
            return {
                ...state,
                isRequesting: false,
                isAuthenticated: false,
                status: false,
                error: false,
                data: false
            }
        default: 
            return state
    }
}