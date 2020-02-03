import {
    DOWNLOAD_TRANSFORMER_DATA_TO_LOCAL, 
    REGISTER_LOG_EVENT, 
    UPDATE_TRANSFORMER_DOWNLOAD_STATUS,
    SET_LOCAL_TRANSFORMER_DATA_STATUS,
    SET_ASIGNED_TRANSFORMER_ACTIVITIES,
    SET_ACTUAL_ACTIVITY,
    CLEAR_ACTUAL_ACTIVITY,
    SET_ACTUAL_NODES,
    CLEAR_ACTUAL_NODES
} from '../types'

const initialState = {
    db_status: 'IDLE',
    download_transformer_data_status: 'WAITING',
    local_transformer_data_status: false,
    transformer_activities_log: [],
    asigned_transformer_activities: [],
    actual_activity_loaded: false,
    actual_activity: false,
    actual_nodes_loaded: false,
    actual_nodes: []
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
        case SET_ASIGNED_TRANSFORMER_ACTIVITIES:
            return {
                ...state,
                asigned_transformer_activities: action.activities
            }
        case SET_ACTUAL_ACTIVITY:
            return {
                ...state,
                actual_activity_loaded: true,
                actual_activity: action.activity
            }
        case CLEAR_ACTUAL_ACTIVITY: 
            return {
                ...state,
                actual_activity_loaded: false,
                actual_activity: false
            }
        case SET_ACTUAL_NODES:
            return {
                ...state,
                actual_nodes_loaded: true,
                actual_nodes: action.nodes
            }
        case CLEAR_ACTUAL_NODES:
            return {
                ...state,
                actual_nodes_loaded: false,
                actual_nodes: []
            }
        default: 
            return state
    }
}