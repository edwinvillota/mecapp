import { 
    DOWNLOAD_TRANSFORMER_DATA_TO_LOCAL,
    ADD_LOCAL_TRANSFORMER,
    DELETE_LOCAL_TRANSFORMER,
    REGISTER_LOG_EVENT,
    UPDATE_TRANSFORMER_DOWNLOAD_STATUS,
    SET_LOCAL_TRANSFORMER_DATA_STATUS
} from '../types'
import DB from '../sqlite/database'
import moment from 'moment'
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
        const ti = t_data.transformer_info
        const tu = t_data.users

        // Inicializar Base de datos
        const SQLite = new DB()
        await SQLite._init()

        const event = new DatabaseEvent('Action', `Descargando información del transformador ${ti.structure} ...`)
        // Register first log event and download status
        dispatch(registerLogEvent(event))
        dispatch(updateTransformerDownloadStatus('PROCESS'))
        // Create transformer local register
        dispatch(addLocalTransformer(ti._id,ti.structure, ti.town, 'uncaptured', 'uncaptured', 'INITIAL', tu))
    }
}

export const addLocalTransformer = (id, structure, town, location, photo, status, users) => {
    return (dispatch, getState) => {
        const db = new DB()
        const creation_date = moment().unix()

        db.query(
            'INSERT OR IGNORE INTO Transformers ' +
            '(id, structure, town, location, photo, creation_date, status) ' + 
            ' VALUES (?,?,?,?,?,?,?)',
            [id,structure,town,location,photo,creation_date,status])
            .then((response) => {
                if (response.rows_affected) {
                    const event = new DatabaseEvent('Success', `Se registro el transformador ${structure}.`)
                    dispatch(registerLogEvent(event))
                    dispatch(addLocalTransformerUsers(users, id))
                } else {
                    const event = new DatabaseEvent('Warning', `${moment().format('DD/MM/YYYY HH:mm')}: El transformador ${structure} ya se encuentra registrado.`)
                    Alert.alert(
                        'Registro duplicado',
                        `El transformador ${structure} ya se encuentra registrado. Elimine el registro y vuelva a intentarlo`
                    )
                    dispatch(registerLogEvent(event))
                }
                
            })
            .catch(error => {

                const event = new DatabaseEvent('Error', `Error al registrar el transformador ${structure}.`, error)
                dispatch(registerLogEvent(event))
                dispatch(updateTransformerDownloadStatus('ERROR'))
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

