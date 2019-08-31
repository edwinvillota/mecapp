import {OPEN_SIDEBAR, CLOSE_SIDEBAR} from '../types'

const initialState = {
    sidebarOpen: false
}

export default sidebarReducer = (state = initialState, action) => {
    switch(action.type) {
        case OPEN_SIDEBAR:
            return {
                ...state,
                sidebarOpen: true
            }
        case CLOSE_SIDEBAR:
            return {
                ...state,
                sidebarOpen: false
            }
        default: 
            return state
    }
}
