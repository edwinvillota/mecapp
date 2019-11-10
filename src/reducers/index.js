import {combineReducers} from 'redux'
import sidebarReducer from './sidebarReducer'
import authenticationReducer from './authenticationReducer'
import boxstateReducer from './boxstateReducer'
import apiReducer from './apiReducer'
import balanceReducer from './balanceReducer'
import transformActivitiesReducer from './transformActivitiesReducer'


export default combineReducers({
    sidebar: sidebarReducer,
    authentication: authenticationReducer,
    boxstate: boxstateReducer,
    api: apiReducer,
    balance: balanceReducer,
    transformActivities: transformActivitiesReducer
})