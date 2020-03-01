import { 
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
    CLEAR_ACTUAL_NODE_OCS,
    SET_ACTUAL_ACTIVITY_BADLINKS,
    CLEAR_ACTUAL_ACTIVITY_BADLINKS,
    SET_ACTUAL_STAKEOUT_PROGRESS,
    CLEAR_ACTUAL_STAKEOUT_PROGRESS
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
                    dispatch(setActualTransformerUsers(response.data))
                    dispatch(registerLogEvent(event))
                } else {
                    const event = new DatabaseEvent('Warning', `No se encontraron usuarios asociados al transformador ${t_structure}.`)                    
                    dispatch(setActualTransformerUsers([]))
                    dispatch(registerLogEvent(event))
                }
            })
            .catch(error => {
                const event = new DatabaseEvent('Error', `Error al consultar los usuarios del transformador ${t_structure}.`, error)
                dispatch(registerLogEvent(event))
                dispatch(setActualTransformerUsers([]))
            })
    }
}

export const setActualTransformerUsers = (users) => {
    return {
        type: SET_ACTUAL_TRANSFORMER_USERS,
        users
    }
}

export const clearActualTransformerUsers = () => {
    return {
        type: CLEAR_ACTUAL_TRANSFORMER_USERS
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
                [node.number, node.location, node.parent_node, activity.id]
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

export const stakeoutLocalUser = (stakeout_user, lecture) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        try {
            const updateResults = await db.query(
                'UPDATE Users SET node_id=?, location=?, user_photo=?, activity_id=? WHERE id=?',
                [stakeout_user.node.id, stakeout_user.location, stakeout_user.user_photo, stakeout_user.node.stakeout_id, stakeout_user.info.id]
            )
    
            if (updateResults.rows_affected > 0) {
                dispatch(addLocalUserLecture(lecture))
            }

        } catch (e) {
            console.log(e)
        }
    }
}

export const setActualStakeoutUser = (stakeout_user) => {
    return {
        type: SET_ACTUAL_STAKEOUT_USER,
        stakeout_user
    }
}

export const clearActualStakeoutUser = () => {
    return {
        type: CLEAR_ACTUAL_STAKEOUT_USER
    }
}

export const addLocalUserLecture = (l) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        try {
            const insertResult = await db.query(
                'INSERT INTO Lectures ' +
                '(user_id, active_lecture, reactive_lecture, active_photo, reactive_photo, activity_id) ' +
                'VALUES (?,?,?,?,?,?)',
                [l.user_id,l.active_lecture,l.reactive_lecture,l.active_photo,l.reactive_photo,l.activity_id]
            )

            if (insertResult.rows_affected > 0) {
                const event = new DatabaseEvent('Success', `Se crearon exitosamente las lecturas del usuario ${l.user_id}`)
                dispatch(registerLogEvent(event))
            } else {
                const event = new DatabaseEvent('Error', `No se crearon las lecturas del usuario ${l.user_id}`)
                dispatch(registerLogEvent(event))
            }

        } catch (e) {
            const event = new DatabaseEvent('Error', `Error con la base de datos al registrar lecturas del usuario ${l.user_id}`, e)
            dispatch(registerLogEvent(event))
        }
    }
}

export const getNodeUsers = (node) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        dispatch(clearActualNodeUsers())

        try {
            const queryResults = await db.query(
                'SELECT * FROM Users WHERE node_id=?',
                [node.id]
            )

            if (queryResults.data.length > 0) {
                const event = new DatabaseEvent('Success', `La consulta de usuarios del nodo ${node.number} fue exitosa`)
                dispatch(registerLogEvent(event))
                dispatch(setActualNodeUsers(queryResults.data))
            } else {
                const event = new DatabaseEvent('Warning', `No se encontraron usuarios en el nodo ${node.number}`)
                dispatch(registerLogEvent(event))
            }
        } catch (e) {
            const event = new DatabaseEvent('Error', `Error al consultar los usuarios del nodo ${node.number}`,e)
            dispatch(registerLogEvent(event))
        }
    }
}

export const setActualNodeUsers = (users) => {
    return {
        type: SET_ACTUAL_NODE_USERS,
        users
    }
}

export const clearActualNodeUsers = () => {
    return {
        type: CLEAR_ACTUAL_NODE_USERS
    }
}

export const getActualUserLectures = (user) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        try {
            const queryResult = await db.query(
                'SELECT * FROM Lectures WHERE user_id=?',
                [user.id]
            )

            if (queryResult.data.length > 0) {
                const event = new DatabaseEvent('Success', `Consulta de lecturas del usuario ${user.code} fue exitosa`)
                dispatch(setActualUserLectures(queryResult.data))
                dispatch(registerLogEvent(event))
            } else {
                const event = new DatabaseEvent('Warning', `No se encontraron lecturas para el usuarios ${user.code}`)
                dispatch(registerLogEvent(event))
            }
        } catch (e) {
            const event = new DatabaseEvent('Error', `Error al consultar lecturas del usuario ${user.code}`, e)
            dispatch(registerLogEvent(event))
        }
    }
}

export const setActualUserLectures = (lectures) => {
    return {
        type: SET_ACTUAL_USER_LECTURES,
        lectures
    }
}

export const clearActualUserLectures = () => {
    return {
        type: CLEAR_ACTUAL_USER_LECTURES
    }
}

export const removeDatabaseLocalUser = (user, node) => {
    return async (dispatch, getState) => {
        if (user.origin == 'Database') {
            const db = new DB()
            await db._init()

            const updateResults = await db.query(
                'UPDATE Users SET node_id=?, location=?, user_photo=?, activity_id=? WHERE id=?',
                [99, 'uncaptured', 'uncaptured', 'uncaptured', user.id]
            )

            if (updateResults.rows_affected > 0) {
                const event = new DatabaseEvent('Success', `Se reseteo el usuario ${user.code}`)
                dispatch(registerLogEvent(event))
                dispatch(getNodeUsers(node))
            } else {
                const event = new DatabaseEvent('Warning', `El usuario ${user.code} no esta registrado`)
                dispatch(registerLogEvent(event))
            }

        } else {
            const event = new DatabaseEvent('Error', `No se puede eliminar el usuario ${user.code} por que es un usuario nuevo`)
            dispatch(registerLogEvent(event))
        }
    }
}

export const stakeoutNewLocalUser = (user, lecture) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        const insertResult = await db.query(
            'INSERT INTO Users ' + 
            '(type, meter, brand, code, address, location, factor, node_id, transformer_id, user_photo, origin, creation_date, activity_id)' +
            'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                user.type,
                user.meter,
                user.brand,
                user.code,
                user.address,
                user.location,
                user.factor,
                user.node.id,
                user.activity.transformer_id,
                user.user_photo,
                'New',
                moment().unix(),
                user.node.stakeout_id
            ]
        )

        if (insertResult.rows_affected > 0) {
            const queryResult = await db.query(
                'SELECT id FROM Users WHERE meter=? AND code=?',
                [user.meter, user.code]
            )

            if (queryResult.data.length === 1) {
                const user = queryResult.data[0]
                lecture.user_id = user.id
                dispatch(addLocalUserLecture(lecture))
            } else if (queryResult.data.length > 1) {

            } 
        } else {

        }
    }
}

export const deleteNewLocalUser = (user, node) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        console.log(user)
        try {
            const deleteUserResult = await db.query(
                'DELETE FROM Users WHERE id=?',
                [user.id]
            )

            if (deleteUserResult.rows_affected > 0) {
                const event = new DatabaseEvent('Success', `Se elimino correctamente el usuario ${user.code}`)
                dispatch(registerLogEvent(event))
    
                const deleteLecturesResult = await db.query(
                    'DELETE FROM Lectures WHERE user_id=?',
                    [user.id]
                )
    
                if (deleteLecturesResult.rows_affected > 0) {
                    const event = new DatabaseEvent('Success', `Se eliminaron correctamente las lecturas del usuario ${user.code}`)
                    dispatch(registerLogEvent(event))
                    dispatch(getNodeUsers(node))
                } else {
                    const event = new DatabaseEvent('Error', `No se encontraro lecturas registradas para el usuario ${user.code}`)
                    dispatch(registerLogEvent(event))
                }
    
            } else {
                const event = new DatabaseEvent('Error', `No se encontraron registros del usuario ${user.code}`)
                dispatch(registerLogEvent(event))
            }
        } catch (e) {
            const event = new DatabaseEvent('Error', `Error con la base de datos al eliminar el usuario ${user.code}`, e)
            dispatch(registerLogEvent(event))
        }
    }
} 

export const stakeoutOtherChargue = (oc) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        try {
            const insertResults = await db.query(
                'INSERT INTO Other_Chargues ' +
                '(type, location, photo, power, comment, node_id, activity_id, transformer_id, creation_date) ' +
                'VALUES (?,?,?,?,?,?,?,?,?)',
                [
                    oc.type,
                    oc.location,
                    oc.oc_photo,
                    oc.power,
                    oc.comment,
                    oc.node.id,
                    oc.node.stakeout_id,
                    oc.activity.transformer_id,
                    moment().unix()
                ]
            )
    
            if (insertResults.rows_affected.length > 0) {
                const event = new DatabaseEvent('Success', `Se creo correctamente la carga de tipo${oc.type}`)
                dispatch(registerLogEvent(event))
            } else {
                const event = new DatabaseEvent('Error', `No se pudo registrar la carga de tipo ${oc.type}`)
                dispatch(registerLogEvent(event))
            }
        } catch (e) {
            const event = new DatabaseEvent('Error', `Error con la base de datos al registrar la carga de tipo ${oc.type}`, e)
            dispatch(registerLogEvent(event))
        }
    }
}

export const removeOtherChargue = (oc, node) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()


        try {
            const deleteResult = await db.query(
                'DELETE FROM Other_Chargues WHERE id=?',
                [oc.id]
            )

            if (deleteResult.rows_affected > 0) {
                const event = new DatabaseEvent('Success', `La carga de tipo ${oc.type} se elimino correctamente`)
                dispatch(registerLogEvent(event))
                dispatch(getNodeOCS(node))
            } else {
                const event = new DatabaseEvent('Error', `No se encontro registro de la carga ${oc.type}:${oc.id}`)
                dispatch(registerLogEvent(event))
            }
        } catch (e) {
            const event = new DatabaseEvent('Error', `Error con la base de datos al eliminar la carga ${oc.type}:${oc.id}`, e)
            dispatch(registerLogEvent(event))
        }
    }
} 

export const getNodeOCS = (node) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        try {
            const queryResult = await db.query(
                'SELECT * FROM Other_Chargues WHERE node_id=?',
                [node.id]
            )

            if (queryResult.data.length > 0) {
                const event = new DatabaseEvent('Success', `Se obtuvieron correctamente las otras cargas del nodo ${node.number}`)
                dispatch(registerLogEvent(event))
                dispatch(setActualNodeOCS(queryResult.data))
            } else {
                const event = new DatabaseEvent('Warning', `No se encontraron cargas asociadas al nodo ${node.number}`)
                dispatch(registerLogEvent(event))
            }
        } catch (e) {
            const event = new DatabaseEvent('Error', `Error con la base de datos al consultar las otras cargas del nodo ${node.number}`, e)
            dispatch(registerLogEvent(event))
        }
    }
}

export const setActualNodeOCS = (ocs) => {
    return {
        type: SET_ACTUAL_NODE_OCS,
        newOcs: ocs
    }
}

export const clearActualNodeOCS = () => {
    return {
        type: CLEAR_ACTUAL_NODE_OCS
    }
}

export const addBadlink = (bl) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        try {
            let insertResult 
            if (bl.type === 'bad_link') {
                insertResult = await db.query(
                    'INSERT INTO BadLinks ' +
                    '(type, user_id, location, photo, new_transformer, activity_id, creation_date, new_transformer_photo, meter_photo) ' +
                    'VALUES (?,?,?,?,?,?,?,?,?)',
                    [
                        bl.type,
                        bl.user.id,
                        bl.location,
                        bl.photo,
                        bl.new_transformer,
                        bl.activity._id,
                        moment().unix(),
                        bl.new_transformer_photo,
                        bl.meter_photo
                    ]
                )
            } else if (bl.type === 'not_found') {
                insertResult = await db.query(
                    'INSERT INTO BadLinks ' +
                    '(type, user_id, activity_id, creation_date)' +
                    'VALUES (?,?,?,?)',
                    [
                        bl.type,
                        bl.user.id,
                        bl.activity._id,
                        moment().unix()
                    ]
                )
            }

            if (insertResult.rows_affected > 0) {
                const event = new DatabaseEvent('Success', `Se registro correctamente el mal vinculo para el usuario ${bl.user.code} `)
                dispatch(registerLogEvent(event))

                const updateUserState = await db.query(
                    'UPDATE Users SET node_id=? WHERE id=?',
                    [98, bl.user.id]
                )
                
                if (updateUserState.rows_affected > 0) {
                    const event = new DatabaseEvent('Success', `Se actualizó el estado del usuario ${bl.user.code}`)
                    dispatch(registerLogEvent(event))
                } else {
                    const event = new DatabaseEvent('Error', `No se actualizó el estado del usuario ${bl.user.code}`)
                    dispatch(registerLogEvent(event))
                }

            } else {
                const event = new DatabaseEvent('Error', `No se registro correctamente el mal vinculo para el usuario ${bl.user.code}`)
                dispatch(registerLogEvent(event))
            }
        } catch (e) {
            const event = new DatabaseEvent('Error', `Error con la base de datos al registrar el mal vinculo para el usuario ${bl.user.code}`, e)
            dispatch(registerLogEvent(event))
        }
    }
} 

export const getBadlinks = (activity) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()
        dispatch(clearActualActivityBadlinks())
        try {
            const queryResult = await db.query(
                'SELECT Badlinks.id,BadLinks.user_id,BadLinks.type,BadLinks.new_transformer,Users.meter ' +
                'FROM BadLinks ' +
                'INNER JOIN Users ' + 
                'ON BadLinks.user_id=Users.id ' +
                'WHERE BadLinks.activity_id=?',
                [activity._id]
            )

            if (queryResult.data.length > 0) {
                dispatch(setActualActivityBadlinks(queryResult.data))
                const event = new DatabaseEvent('Success' , `Se obtuvieron correctamente los errores de vinculo de la actividad ${activity._id}`)
                dispatch(registerLogEvent(event))
            } else {
                const event = new DatabaseEvent('Warning' , `No se encontraron errores de vinculo para la actividad ${activity._id}`)
                dispatch(registerLogEvent(event))
            }
        } catch (e) {
            const event = new DatabaseEvent('Error' , `Error con la base de datos al consultar los errores de vinculo de la actividad: ${activity._id}`, e)
            dispatch(registerLogEvent(event))
        }
    }
}

export const setActualActivityBadlinks = (badlinks) => {
    return {
        type: SET_ACTUAL_ACTIVITY_BADLINKS,
        newBadlinks: badlinks
    }
}

export const clearActualActivityBadlinks = () => {
    return {
        type: CLEAR_ACTUAL_ACTIVITY_BADLINKS
    }
}

export const deleteBadlink = (bl, activity) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()

        try {
            const deleteResult = await db.query(
                'DELETE FROM BadLinks WHERE id=?',
                [bl.id]
            )

            if (deleteResult.rows_affected > 0) {
                const event = new DatabaseEvent('Success', `Se elimino correctamente el error de vinculo del medidor ${bl.meter}`)
                dispatch(registerLogEvent(event))
                const updateResult = await db.query(
                    'UPDATE Users SET node_id=? WHERE id=?',
                    [99, bl.user_id]
                )

                if (updateResult.rows_affected > 0) {
                    const event = new DatabaseEvent('Success', `Se actualizo el estado del medidor ${bl.meter}`)
                    dispatch(registerLogEvent(event))
                    console.log(event)
                    dispatch(getBadlinks(activity))
                } else {
                    const event = new DatabaseEvent('Error', `No se actualizo el estado del medidor ${bl.meter}`)
                    dispatch(registerLogEvent(event))
                }

            } else {
                const event = new DatabaseEvent('Error', `No se elimino el error de vinculo del medidor ${bl.meter}`)
                dispatch(registerLogEvent(event))
            }
        } catch (e) {
            const event = new DatabaseEvent('Error', `Error con la base de datos al eliminar el error de vinculo del medidor ${bl.meter}`, e)
            dispatch(registerLogEvent(event))
        }
    }
}

export const getStakeoutProgress = (activity) => {
    return async (dispatch, getState) => {
        const db = new DB()
        await db._init()
        dispatch(clearActualStakeoutProgress())
        try {
            let total_db_users
            let stakeout_db_users
            let new_users
            let bad_links
            let ocs
            let nodes 

            const totalDBUsers = await db.query(
                'SELECT COUNT(id) AS db_users FROM Users WHERE transformer_id=? AND origin=?',
                [activity.transformer_id, 'Database']
            )

            total_db_users = totalDBUsers.data[0].db_users

            const stakeoutDBUsers = await db.query(
                'SELECT COUNT(id) AS stakeout_users FROM Users WHERE activity_id=? AND node_id<? AND origin=?',
                [activity._id,98,'Database']
            )

            stakeout_db_users = stakeoutDBUsers.data[0].stakeout_users 

            const newUsers = await db.query(
                'SELECT COUNT(id) AS new_users FROM Users WHERE activity_id=? AND origin=?',
                [activity._id, 'New']
            )

            new_users = newUsers.data[0].new_users

            const badLinks = await db.query(
                'SELECT COUNT(id) AS bad_links FROM BadLinks WHERE activity_id=?',
                [activity._id]
            )

            bad_links = badLinks.data[0].bad_links

            const otherChargues = await db.query(
                'SELECT COUNT(id) AS ocs FROM Other_Chargues WHERE activity_id=?',
                [activity._id]
            )

            ocs = otherChargues.data[0].ocs

            const nodesQuery = await db.query(
                'SELECT COUNT(id) AS nodes FROM Nodes WHERE stakeout_id=?',
                [activity._id]
            )

            nodes = nodesQuery.data[0].nodes

            const progress = {
                total_db_users,
                stakeout_db_users,
                new_users,
                bad_links,
                ocs,
                nodes
            }

            dispatch(setActualStakeoutProgress(progress))

        } catch (e) {
            console.log(e)
        }
    }
}

export const setActualStakeoutProgress = (progress) => {
    return {
        type: SET_ACTUAL_STAKEOUT_PROGRESS,
        progress
    }
}

export const clearActualStakeoutProgress = (progress) => {
    return {
        type: CLEAR_ACTUAL_STAKEOUT_PROGRESS,
        progress
    }
} 