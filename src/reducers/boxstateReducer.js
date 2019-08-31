import {SET_SEARCH_TYPE, SET_DEVICE_NUMBER, PREV_INFO_REQUEST, PREV_INFO_FAILURE, PREV_INFO_SUCCESS, BOX_INFO_SUCCESS} from '../types'

const initialState = {
    searchType: '1',
    deviceNumber: null,
    isRequesting: false,
    error: false ,
    existsDevice: false,
    prevInfo: false,
    boxInfo: false,
}

export default boxstateReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SEARCH_TYPE:
            return {
                ...state,
                searchType: action.searchType,
                existsDevice: false
            }
        case SET_DEVICE_NUMBER:
            return {
                ...state,
                deviceNumber: action.deviceNumber,
                existsDevice: false
            }
        case PREV_INFO_REQUEST:
            return {
                ...state,
                isRequesting: true
            }
        case PREV_INFO_FAILURE:
            return {
                ...state,
                isRequesting: false,
                existsDevice: false,
                prevInfo: false,
                boxInfo: false,
                error: action.error
            }
        case PREV_INFO_SUCCESS: 
            return {
                ...state,
                isRequesting: false,
                existsDevice: true,
                prevInfo: action.prevInfo
            }
        case BOX_INFO_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                boxInfo: action.boxInfo
            }
        default:
            return state
    }
}