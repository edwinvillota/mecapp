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

    validateNoEmpty(value, propname) {
        if(Validator.isEmpty(value)) {
            return {
                isValid: false,
                error: `El valor de ${propname} no puede estar vacio`
            }
        } else {
            return {
                isValid: true
            }
        }
    }

    validateUserType(user_type) {
        if (Validator.isEmpty(user_type)) {
            return {
                isValid: false,
                error: 'Tipo de usuario invalido'
            }
        } else {
            return {
                isValid: true
            }
        }
    }

    validateMeter(meter) {
        if (Validator.isEmpty(meter)) {
            return {
                isValid: false,
                error: 'El serial del medidor esta Vacio'
            }
        } else {
            return {
                isValid: true
            }
        }
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