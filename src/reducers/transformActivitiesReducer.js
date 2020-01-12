import {
    DOWNLOAD_TRANSFORMER_DATA_TO_LOCAL, 
    REGISTER_LOG_EVENT, 
    UPDATE_TRANSFORMER_DOWNLOAD_STATUS,
    SET_LOCAL_TRANSFORMER_DATA_STATUS
} from '../types'

const initialState = {
    db_status: 'IDLE',
    download_transformer_data_status: 'WAITING',
    local_transformer_data_status: false,
    transformer_activities_log: []
}

export default transformActivitiesReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_LOG_EVENT:
            return {
                ...state,
                transformer_activities_log: [...state.transformer_activities_log, action.log_event]
            }
        case UPDATE_TRANSFORMER_DOWNLOAD_STATUS: {
            return {
                ...state,
                download_transformer_data_status: action.new_status
            }
        }
        case DOWNLOAD_TRANSFORMER_DATA_TO_LOCAL:
            return {
                ...state
            }
        case SET_LOCAL_TRANSFORMER_DATA_STATUS:
            return {
                ...state,
                local_transformer_data_status: action.new_status
            }
        default: 
            return state
    }
}