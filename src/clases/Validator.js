class Validator {
    constructor () {

    }

    static isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
          )
    }

    validateLocation(location) {
        if (Validator.isEmpty(location)) {
            return {
                isValid: false,
                error: 'La ubicación esta vacia'
            }
        } else {
            return {
                isValid: true
            }
        }
    }

    validatePhoto(photo) {
        if (Validator.isEmpty(photo)) {
            return {
                isValid: false,
                error: 'La ubicación esta vacia'
            }
        } else {
            return {
                isValid: true
            }
        }
    }

    validateLecture(lecture) {
        if (Validator.isEmpty(lecture)) {
            return {
                isValid: false,
                error: 'Lectura Vacia'
            }
        } else {
            if (isNaN(parseFloat(lecture)) || parseFloat(lecture) <= 0) {
                return {
                    isValid: false,
                    error: 'Lectura no valida'
                }   
            } else {
                return {
                    isValid: true
                }
            }
        }
    }
}

export default Validator