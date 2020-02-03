import { 
    DOWNLOAD_TRANSFORMER_DATA_TO_LOCAL,
    ADD_LOCAL_TRANSFORMER,
    DELETE_LOCAL_TRANSFORMER,
    REGISTER_LOG_EVENT,
    UPDATE_TRANSFORMER_DOWNLOAD_STATUS,
    SET_LOCAL_TRANSFORMER_DATA_STATUS,
    SET_ASIGNED_TRANSFORMER_ACTIVITIES,
    SET_ACTUAL_ACTIVITY,
    CLEAR_ACTUAL_ACTIVITY,
    SET_ACTUAL_NODES,
    CLEAR_ACTUAL_NODES
} from '../types'
import DB from '../sqlite/database'
import moment from 'moment'
import axios from 'axios'
import { Alert } from 'react-native'
import DatabaseEvent from '../clases/databaseEvent'


export const registerLogEvent = (log_event) => {
    return {
        type: REGISTER_LOG_EVENT,
        log_event
    }
}

export const updateTransformerDownloadStatus = (new_status) => {
    return {
        type: UPDATE_TRANSFORMER_DOWNLOAD_STATUS,
        new_status
    }
}

export const downloadTransformerToLocal = (t_data) => {
    return async(dispatch, getState) => {
        const ti = t_data
        const tu = t_data.users

        // Inicializar Base de datos
        const SQLite = new DB()
        await SQLite._init()

        const event = new DatabaseEvent('Action', `Descargando información del transformador ${ti.structure} ...`)
        // Register first log event and download status
        dispatch(registerLogEvent(event))
        dispatch(updateTransformerDownloadStatus('PROCESS'))
        // Create transformer local register
        dispatch(addLocalTransformer(ti._id,ti.structure, ti.town, ti.address, ti.kva, ti.status, ti.location, ti.photo,  tu))
    }
}

export const addLocalTransformer = (id, structure, town, address, kva, status, location, photo, users) => {
    return (dispatch, getState) => {
        const db = new DB()
        const creation_date = moment().unix()

        db.query(
            'SELECT id FROM Transformers WHERE id=?',
            [id]
            )
            .then(response => {
                if (response.data.length === 0) {
                    db.query(
                        'INSERT INTO Transformers ' +
                        '(id, structure, town, address, kva, creation_date, status, location, photo) ' + 
                        ' VALUES (?,?,?,?,?,?,?,?,?)',
                        [id,structure,town,address,kva,creation_date,status,location,photo])
                        .then((response) => {
                            if (response.rows_affected) {
                                const event = new DatabaseEvent('Success', `Se registro el transformador ${structure}.`)
                                dispatch(registerLogEvent(event))
                                dispatch(addLocalTransformerUsers(users, id))
                            } else {
                                const event = new DatabaseEvent('Error',`No se pudo registrar el transformador ${structure}.`)
                                dispatch(registerLogEvent(event))
                            }
                        })
                        .catch(error => {
                            const event = new DatabaseEvent('Error', `Error al registrar el transformador ${structure}.`, error)
                            dispatch(registerLogEvent(event))
                            dispatch(updateTransformerDownloadStatus('ERROR'))
                        })
                } else {
                    const event = new DatabaseEvent('Error',`El transformador ${structure} ya se encuentra registrado.`)
                    dispatch(registerLogEvent(event))
                    dispatch(getLocalTransfomerDataStatus(id, structure))
                }
            })
            .catch(error => {
                const event = new DatabaseEvent('Error', `Error al consultar el registro del transformador ${t_structure}`, error)
                dispatch(registerLogEvent(event))
                dispatch(setLocalTransformerDataStatus('ERROR'))
            })

    }
}

export const addLocalTransformerUsers = (users, t_id) => {
    return (dispatch, getState) => {

        const db = new DB()
        const creation_date = moment().unix()
        
        users.forEach(u => {
            const type = 'Normal'
            const meter = u.meter
            const brand = u.brand
            const code = u.code
            const address = u.address
            const location = 'uncaptured'
            const factor = 1
            const node_id = 99
            const transformer_id = t_id 
            const user_photo = 'uncaptured'
            const origin = 'Database'

            db.query(
                'INSERT OR IGNORE INTO Users ' +
                '(type, meter, brand, code, address, location, factor, node_id, transformer_id, user_photo, origin, creation_date)' +
                'VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                [type, meter, brand, code, address, location, factor, node_id, transformer_id, user_photo, origin, creation_date])
                .then(response => {
                    if (response.rows_affected) {
                        const event = new DatabaseEvent('Success', `Se registro el usuario con medidor ${brand}-${meter}.`)
                        dispatch(registerLogEvent(event))
                    } else {
                        const event = new DatabaseEvent('Warning', `El usuario con medidor ${brand}-${meter} ya esta registrado.`)
                        dispatch(registerLogEvent(event))
                    }
                    dispatch(updateTransformerDownloadStatus('SUCCESS'))
                    dispatch(setLocalTransformerDataStatus(t_id, 'DOWNLOADED'))
                })
                .catch(error => {
                    const event =  new DatabaseEvent('Error', `Error al registrar a el usuario con medidor ${brand}-${meter}.`, error)
                    dispatch(registerLogEvent(event))
                })
        })
    }
}

export const cleanLocalTransformerData = (t_id, t_structure) => {
    return async (dispatch, getState) => {

        // Initialize data base
        const db = new DB()
        await db._init()

        const event = new DatabaseEvent('Action',`Eliminando información local del transformador ${t_structure}`)

        // Borrar usuarios
        dispatch(deleteLocalTransformerUsers(t_id, t_structure))

        // Borrar transformador
        dispatch(deleteLocalTransformer(t_id, t_structure))

        dispatch(setLocalTransformerDataStatus(t_id, 'NOT_FOUND'))
    }
}

export const deleteLocalTransformer = (t_id, t_structure) => {
    return (dispatch, getState) => {
        const db = new DB()

        db.query(`DELETE FROM Transformers WHERE id=?`, [t_id])
        .then(response => {
            if (response.rows_affected) {
                const event = new DatabaseEvent('Success',`Se eliminó el transformador ${t_structure}`)
                dispatch(registerLogEvent(event))
            } else {
                const event = new DatabaseEvent('Warning', `El transformador ${t_structure} no se encuentra registrado.`)
                dispatch(registerLogEvent(event))
            }
        })
        .catch(error => {
            const event = new DatabaseEvent('Error', `Error al eliminar el transformador ${t_structure}`, error)
            dispatch(registerLogEvent(event))
        })
    }
}

export const deleteLocalTransformerUsers = (t_id, t_structure) => {
    return (dispatch, getState) => {
        const db = new DB()

        db.query(`DELETE FROM Users WHERE transformer_id=?`, [t_id])
            .then(response => {
                if (response.rows_affected) {
                    const event = new DatabaseEvent('Success',`Se eliminaron ${response.rows_affected} usuarios del transformador ${t_structure}`)
                    dispatch(registerLogEvent(event))
                } else {
                    const event = new DatabaseEvent('Warning', `No se encontraron usuarios en el transformador ${t_structure}.`)
                    dispatch(registerLogEvent(event))
                }
            })
            .catch(error => {
                const event = new DatabaseEvent('Error', `Error al eliminar los usuarios del transformador ${t_structure}`, error)
                dispatch(registerLogEvent(event))
            })
    }
}

export const getLocalTransfomerDataStatus = (t_id, t_structure) => {
    return async (dispatch, getState) => {
        dispatch(setLocalTransformerDataStatus(t_id, 'QUERYING'))
        const event = new DatabaseEvent('Action', `Consultado el estado local del transformador ${t_structure}`)
        dispatch(registerLogEvent(event))
        const db = new DB()
        await db._init()

        db.query(
            'SELECT id FROM Transformers WHERE id=?',
            [t_id]
            )
            .then(response => {
                if (response.data.length) {
                    const event = new DatabaseEvent('Success', `El transformador ${t_structure} existe en la base de datos.`)
                    dispatch(registerLogEvent(event))
                    db.query(
                        'SELECT id FROM Users WHERE transformer_id=?',
                        [t_id]
                        )
                        .then(response => {
                            if (response.data.length) {
                                const event = new DatabaseEvent('Success', `El transformador ${t_structure} tiene usuarios registrados en la base de datos.`)
                                dispatch(registerLogEvent(event))
                                dispatch(setLocalTransformerDataStatus(t_id, 'DOWNLOADED'))
                            } else {
                                const event = new DatabaseEvent('Error', `Error: el transformador ${t_structure} no tiene usuarios registrados.`)
                                dispatch(registerLogEvent(event))
                                dispatch(setLocalTransformerDataStatus(t_id, 'ERROR'))
                            }
                        })
                        .catch(error => {
                            const event = new DatabaseEvent('Error', `Error al consultar los usuarios del transformador ${t_structure}.`, error)
                            dispatch(registerLogEvent(event))
                        })
                } else {
                    const event = new DatabaseEvent('Error', `El transformador ${t_structure} no esta registrado.`)
                    dispatch(registerLogEvent(event))
                    dispatch(setLocalTransformerDataStatus(t_id, 'NOT_FOUND'))
                }
            })
            .catch(error => {
                const event = new DatabaseEvent('Error', `Error al consultar el registro del transformador ${t_structure}`, error)
                dispatch(registerLogEvent(event))
                dispatch(setLocalTransformerDataStatus('ERROR'))
            })
    }
}

export const setLocalTransformerDataStatus = (t_id, new_status) => {
    return {
        type: SET_LOCAL_TRANSFORMER_DATA_STATUS,
        new_status
    }
}

export const getLocalTransformerUsers = (t_id, t_structure) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        db.query('SELECT * FROM Users WHERE transformer_id=?',[t_id])
            .then(response => {
                if (response.data.length) {
                    const event = new DatabaseEvent('Success', `Usuarios del transformador ${t_structure} obtenidos correctamente.`)
                    console.log(response.data)
                    dispatch(registerLogEvent(event))
                } else {
                    const event = new DatabaseEvent('Warning', `No se encontraron usuarios asociados al transformador ${t_structure}.`)                    
                    dispatch(registerLogEvent(event))
                }
            })
            .catch(error => {
                const event = new DatabaseEvent('Error', `Error al consultar los usuarios del transformador ${t_structure}.`, error)
                dispatch(registerLogEvent(event))
            })
    }
}

export const getAsignedTransformerActivities = (user_id) => {
    return async (dispatch, getState) => {
        const {url} = getState().api
        const {isAuthenticated} = getState().authentication

        if (isAuthenticated) {
            const endpoint = `${url}/transformers/activities/asigned`

            const asignedActivities = await axios.get(endpoint)

            dispatch(setAsignedTransformerActivities(asignedActivities.data))
        }
    }
}

export const setAsignedTransformerActivities = (activities) => {
    return {
        type: SET_ASIGNED_TRANSFORMER_ACTIVITIES,
        activities
    }
} 

// Activities actions

export const addLocalActivity = (activity) => {
    return async (dispatch, getState) => {
        const db = new DB()
        const creation_date = moment().unix()
        await db._init()
        try {
            const localActivity = await db.query('SELECT * FROM Activities WHERE id=?', [activity._id])
            if (localActivity.data.length === 0) {
                const event = new DatabaseEvent('Action', `La actividad ${activity.type}:${activity._id} no existe`)
                dispatch(registerLogEvent(event))
                const insertResult = await db.query(
                    'INSERT INTO Activities ' +
                    '(id, transformer_id, type, start_date, end_date, status) ' +
                    'VALUES (?,?,?,?,?,?)',
                    [activity._id, activity.transformer_id, activity.type, creation_date, creation_date, 'PROCESS']
                )

                if (insertResult.rows_affected > 0) {
                    const event = new DatabaseEvent('Success', `La actividad ${activity.type}:${activity._id} fue creada exitosamente`)
                    dispatch(registerLogEvent(event))
                    dispatch(loadActualActivity(activity))
                } else {
                    const event = new DatabaseEvent('Error', `Error al crear ${activity.type}:${activity._id}`)
                    dispatch(registerLogEvent(event))
                }
            } else if (localActivity.data.length > 0) {
                dispatch(loadActualActivity(activity))

            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const loadActualActivity = (activity) => {
    return async (dispatch, getState) => {
        const event = new DatabaseEvent('Action', `Cargando actividad ${activity.type}:${activity._id}`)
        dispatch(registerLogEvent(event))

        try {
            const db = new DB()
            const queryResult = await db.query('SELECT * FROM Activities WHERE id=?', [activity._id])
    
            if(queryResult.data.length > 0) {
                const event = new DatabaseEvent('Success', `Se cargo la actividad ${activity.type}:${activity._id}`)
                dispatch(setActualActivity(queryResult.data[0]))
            } else {
                const event = new DatabaseEvent('Error', `No se pudo cargar la actividad ${activity.type}:${activity._id}`)
            }
        } catch (e) {
            console.log(e)
        }
    }
} 

export const setActualActivity = (activity) => {
    return {
        type: SET_ACTUAL_ACTIVITY,
        activity
    }
}

export const clearActualActivity = () => {
    return {
        type: CLEAR_ACTUAL_ACTIVITY
    }
}

export const loadStakeoutNodes = (activity) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        try {
            const queryResult = await db.query(
                'SELECT * FROM Nodes WHERE stakeout_id=?',
                [activity._id || activity.id]
            )
            
            if (queryResult.data.length > 0) {
                const event = new DatabaseEvent('Success', `Cargando nodos de acitivad ${activity._id}`)
                dispatch(registerLogEvent(event))
                dispatch(setActualNodes(queryResult.data))
            } else {
                const event = new DatabaseEvent('Warning', 'No se encontrato nodos para cargar')
                dispatch(registerLogEvent(event))
                dispatch(setActualNodes([]))
            }

        } catch (e) {
            const event = new DatabaseEvent('Error', `Error al cargar nodos de actividad ${activity._id}`)
            dispatch(registerLogEvent(event))
        }
    }
}

export const setActualNodes = (nodes) => {
    return {
        type: SET_ACTUAL_NODES,
        nodes
    }
}

export const clearActualNodes = () => {
    return {
        type: CLEAR_ACTUAL_NODES
    }
}

export const addLocalStakeoutNode = (node) => {
    return async (dispatch, getState) => {
        const db = new DB()
        const activity = getState().transformActivities.actual_activity

        try {
            const resultsInsert = await db.query(
                'INSERT INTO Nodes ' +
                '(number, location, parent_node, stakeout_id) ' +
                'VALUES (?,?,?,?)',
                [node.number, node.location, node.parent_node, node.stakeout_id]
            )
    
            if (resultsInsert.rows_affected > 0) {
                const event = new DatabaseEvent('Success', `Se creo el nodo ${node.number}`)
                dispatch(registerLogEvent(event))
                dispatch(loadStakeoutNodes(activity))
            } else {
                const event = new DatabaseEvent('Error', `Error al crear el nodo ${node.number}`)
                dispatch(registerLogEvent(event))
            }
        } catch (e) {
            const event = new DatabaseEvent('Error', `Error al crear el nodo ${node.number}`, e)
            dispatch(registerLogEvent(event))
        }
    }
}


