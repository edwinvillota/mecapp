import moment from 'moment'

class DatabaseEvent {
    constructor (type, message, error = false) {
        this.type = type,
        this.date = moment().unix(),
        this.message = `${moment().format('DD/MM/YYYY HH:mm')}: ${message}`
        this.error = error
    }
}

export default DatabaseEvent