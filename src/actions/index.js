import {OPEN_SIDEBAR, CLOSE_SIDEBAR, DEL_STAKEOUT_USER, SET_TRANSFORMER_USER_STATUS} from '../types'
import {LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT,
        SET_SEARCH_TYPE, SET_DEVICE_NUMBER,
        PREV_INFO_REQUEST, PREV_INFO_FAILURE, PREV_INFO_SUCCESS,
        BOX_INFO_SUCCESS, GET_ALL_TRANSFORMERS, GET_TRANSFORMER_DATA, SET_TRANSFORMER_REQUEST_STATUS,
        ADD_TRANSFORMER_STAKEOUT, GET_TRANSFORMER_STAKEOUTS, DEL_TRANSFORMER_STAKEOUT, LOAD_TRANSFORMER_STAKEOUT, UPDATE_TRANSFORMER_STAKEOUT,
        ADD_STAKEOUT_NODE, DEL_STAKEOUT_NODE, ADD_STAKEOUT_USER
    } from '../types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {Toast, ActionSheet} from 'native-base'
import {AsyncStorage, Alert} from 'react-native'

// Sidebar Actions
export const openSideBar = () => {
    return {
        type: OPEN_SIDEBAR
    }
}

export const closeSideBar = () => {
    return {
        type: CLOSE_SIDEBAR
    }
}

// Authentication actions

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginFailure = (err) => {
    Toast.show({
        text: 'Datos incorrectos',
        buttonText: 'OK'
    })
    return {
        type: LOGIN_FAILURE,
        error: err
    }
}

export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        data
    }
}

export const login = (user) => {
    return function (dispatch, getState) {
        const {url} = getState().api
        const endpoint = `${url}/users/signin`
        dispatch(loginRequest())
        return axios.post(endpoint, {user: user})
            .then(res => {
                const data = jwt_decode(res.data.token)

                AsyncStorage.multiSet([
                    ['isAuthenticated', 'true'],
                    ['data', JSON.stringify(data)],
                    ['token', res.data.token]
                ])

                axios.defaults.headers.common['Authorization'] = res.data.token

                dispatch(loginSuccess(data))
            })
            .catch(err => {
                delete axios.defaults.headers.common['Authorization']
                const error = err.response ? err.response.data : err
                dispatch(loginFailure(error))
            })
    }
}

export const logout = () => {
    AsyncStorage.clear()

    return {
        type: LOGOUT
    }
}

// Boxstate actions

export const setSearchType = (searchType) => {
    return {
        type: SET_SEARCH_TYPE,
        searchType
    }
} 

export const setDeviceNumber = (deviceNumber) => {
    return {
        type: SET_DEVICE_NUMBER,
        deviceNumber
    }
}

export const prevInfoRequest = () => {
    return {
        type: PREV_INFO_REQUEST
    }
}

export const prevInfoFailure = (error) => {
    Toast.show({
        text: 'Dispositivo no encontrado',
        buttonText: 'OK'
    })
    return {
        type: PREV_INFO_FAILURE,
        error
    }
}

export const prevInfoSuccess = (prevInfo) => {
    if (prevInfo.concentrador) {
        return {
            type: PREV_INFO_SUCCESS,
            prevInfo
        }
    } else {
        return {
                type: PREV_INFO_FAILURE,
                error
        }
    }
}

export const getPrevInfo = () => {
    return (dispatch, getState) => {
        const {url} = getState().api
        const endpoint = `${url}/dbcsv/getPreInfo`
        const {
            searchType,
            deviceNumber
        } = getState().boxstate
        dispatch(prevInfoRequest())
        return axios.post(endpoint, {searchType: parseInt(searchType), number: parseInt(deviceNumber)})
            .then(response => {
                const data = response.data
                dispatch(prevInfoSuccess(data))
                dispatch(getBoxInfo(data))
            }).catch(error => {
                dispatch(prevInfoFailure(error))
            })
    }
}

export const boxInfoSuccess = (boxInfo) => {
    return {
        type: BOX_INFO_SUCCESS,
        boxInfo
    }
}

export const getBoxInfo = (prevInfo) => {
    return (dispatch, getState) => {
        dispatch(prevInfoRequest())
        if(prevInfo.colector) {
            const {url} = getState().api
            const endpoint = `${url}/dbcsv/getBoxState`
            const colector = prevInfo.colector
            return axios.get(endpoint, {
                    params: {
                        searchType: 1,
                        number: colector
                    }
                })
                .then(response => {
                    const data = response.data
                    dispatch(boxInfoSuccess(data))
                }).catch(error => {
                    dispatch(prevInfoFailure(error))
                })
        } else {
            const error = 'No se encontro el dispositivo.'
            dispatch(prevInfoFailure(error))
        }
    }
}

// Balance Actions

export const setTransformerRequestStatus = (newStatus) => {
    return {
        type: SET_TRANSFORMER_REQUEST_STATUS,
        requestStatus: newStatus
    }
}

export const getAllTransformersSuccess = (transformers) => {
    return {
        type: GET_ALL_TRANSFORMERS,
        transformers
    }
}

export const getAllTransformers = () => {
    return (dispatch, getState) => {
        const { url } = getState().api
        const endpoint = `${url}/transformers`
        return axios.get(endpoint)
            .then(response => {
                const transformers = response.data
                dispatch(getAllTransformersSuccess(transformers))
            })
            .catch(err => {
                alert(err)
            })
    }
}

export const getTransformerDataSuccess = (transformer_data) => {
    return {
        type: GET_TRANSFORMER_DATA,
        transformer_data
    }
}

export const getTransformerData = (id) => {
    return (dispatch, getState) => {
        dispatch(setTransformerRequestStatus('REQUESTING'))
        const { url } = getState().api
        const endpoint = `${url}/transformer/${id}`
        return axios.get(endpoint)
            .then(response => {
                const data = response.data
                dispatch(getTransformerDataSuccess(data))
            })
            .catch(err => {
                alert(err)
            })
    }
}

export const setTransformerUserStatus = (meter, newStatus) => {
    return (dispatch, getState) => {
        const { users } = getState().balance.transformer_data
        const newUsers = users.map(u => {
            if (u.meter === meter) {
                u.stakeout = newStatus
            }
            return u
        })

        dispatch(updateBalanceUsers(newUsers))
    }
}

export const updateBalanceUsers = (newUsers) => {
    return {
        type: SET_TRANSFORMER_USER_STATUS,
        newUsers
    }
}

// Transform Activities Actions
export const getTransformerStakeOuts = (transformer_id) => {
    return {
        type: GET_TRANSFORMER_STAKEOUTS,
        transformer_id
    }
}

export const addTransformerStakeOut = (transformer_id) => {
    return (dispatch, getState) => {
        const { stakeouts } = getState().transformActivities
        let exists = false 
        stakeouts.forEach(s => {
            if (s.transformer_id === transformer_id) {
                exists = true
            }
        })
        if (exists) {
            Alert.alert(
                'Confirmar',
                'El transformador ya tiene un levantamiento en progreso',
                [
                    {
                        text: 'Eliminar',
                        onPress: () => {
                            dispatch(delTransformerStakeOut(transformer_id))
                            dispatch(addTransformerStakeOut(transformer_id))
                        }
                    },
                    {
                        text: 'Editar',
                        onPress: () => {
                            dispatch(loadTransformerStakeOut(transformer_id))
                        }
                    }
                ],
                {cancelable: false}
            )
        } else {
            alert('Creado nuevo levantamiento')
            dispatch(createTransformerStakeOut(transformer_id))
        }
    }
}

export const createTransformerStakeOut = (transformer_id) => {
    return {
        type: ADD_TRANSFORMER_STAKEOUT,
        transformer_id
    }
}

export const updateTransformerStakeOut = (transformer_id) => {
    return {
        type: UPDATE_TRANSFORMER_STAKEOUT,
        transformer_id
    }
}

export const delTransformerStakeOut = (transformer_id) => {
    return {
        type: DEL_TRANSFORMER_STAKEOUT,
        transformer_id
    }
}

export const chargueTransformerStakeOut = (transformer_id) => {
    // Search stakeouts pending
    return (dispatch, getState) => {
        const { stakeouts } = getState().transformActivities

        console.log('Levantamientos Disponibles')
        console.log(stakeouts)
        let exists = false 
        stakeouts.forEach(s => {
            if (s.transformer_id === transformer_id) {
                exists = true
            }
        })
        console.log('Existe un levantamiento previo')
        console.log(exists)

        if(exists){
            console.log('Cargando Ultimo levantamiento')
            dispatch(loadTransformerStakeOut(transformer_id))
        } else {
            console.log('Creando uno nuevo')
            dispatch(createTransformerStakeOut(transformer_id))
        }
    }
}

export const loadTransformerStakeOut = (transformer_id) => {
    return {
        type: LOAD_TRANSFORMER_STAKEOUT,
        transformer_id
    }
}

// Nodos
export const addStakeoutNode = (newNode) => {
    return {
        type: ADD_STAKEOUT_NODE,
        newNode
    }
}

export const delStakeoutNode = (nodeNumber) => {
    return {
        type: DEL_STAKEOUT_NODE,
        nodeNumber
    }
}
// Usuarios 
export const addStakeoutUser = (newUser) => {
    return {
        type: ADD_STAKEOUT_USER,
        newUser
    }
}

export const delStakeoutUser = (user) => {
    return {
        type: DEL_STAKEOUT_USER,
        user
    }
} 