import {
    DOWNLOAD_TRANSFORMER_DATA_TO_LOCAL, 
    REGISTER_LOG_EVENT, 
    UPDATE_TRANSFORMER_DOWNLOAD_STATUS,
    SET_LOCAL_TRANSFORMER_DATA_STATUS,
    SET_ASIGNED_TRANSFORMER_ACTIVITIES,
    SET_ACTUAL_ACTIVITY,
    CLEAR_ACTUAL_ACTIVITY,
    SET_ACTUAL_NODES,
    CLEAR_ACTUAL_NODES,
    SET_ACTUAL_TRANSFORMER_USERS,
    CLEAR_ACTUAL_TRANSFORMER_USERS,
    SET_ACTUAL_STAKEOUT_USER,
    CLEAR_ACTUAL_STAKEOUT_USER,
    SET_ACTUAL_NODE_USERS,
    CLEAR_ACTUAL_NODE_USERS,
    SET_ACTUAL_USER_LECTURES,
    CLEAR_ACTUAL_USER_LECTURES,
    SET_ACTUAL_NODE_OCS,
    CLEAR_ACTUAL_NODE_OCS
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
    actual_nodes: [],
    actual_transformer_users_loaded: false,
    actual_transformer_users: [],
    actual_stakeout_user_loaded: false,
    actual_stakeout_user: {},
    actual_node_users_loaded: false,
    actual_node_users: [],
    actual_user_lectures_loaded: false,
    actual_user_lectures: [],
    actual_node_ocs_loaded: false,
    actual_node_ocs: []
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
        case SET_ACTUAL_TRANSFORMER_USERS:
            return {
                ...state,
                actual_transformer_users_loaded: true,
                actual_transformer_users: action.users
            }
        case CLEAR_ACTUAL_TRANSFORMER_USERS:
            return {
                ...state,
                actual_transformer_users_loaded: false,
                actual_transformer_users: []
            }
        case SET_ACTUAL_STAKEOUT_USER: 
            return {
                ...state,
                actual_stakeout_user_loaded: true,
                actual_stakeout_user: action.stakeout_user
            }
        case CLEAR_ACTUAL_STAKEOUT_USER: 
            return {
                ...state,
                actual_stakeout_user_loaded: false,
                actual_stakeout_user: {}
            }
        case SET_ACTUAL_NODE_USERS:
            return {
                ...state,
                actual_node_users_loaded: true,
                actual_node_users: action.users
            }
        case CLEAR_ACTUAL_NODE_USERS:
            return {
                ...state,
                actual_node_users_loaded: false,
                actual_node_users: []
            }
        case SET_ACTUAL_USER_LECTURES:
            return {
                ...state,
                actual_user_lectures_loaded: true,
                actual_user_lectures: action.lectures
            }
        case CLEAR_ACTUAL_USER_LECTURES: 
            return {
                ...state,
                actual_node_users_loaded: false,
                actual_user_lectures: []
            }
        case SET_ACTUAL_NODE_OCS:
            return {
                ...state,
                actual_node_ocs_loaded: true,
                actual_node_ocs: action.newOcs
            }
        case CLEAR_ACTUAL_NODE_OCS:
            return {
                ...state,
                actual_node_ocs_loaded: false,
                actual_node_ocs: []
            }
        default: 
            return state
    }
}