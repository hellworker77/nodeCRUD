const minNameLength = 3

const VALID = "Valid"
const INVALID = "Invalid"
const AGE_IS_NOT_A_NUMERIC = "age is not a numeric"
const NAME_IS_NOT_A_STRING = "name is not a string"
const NAME_LENGTH_LOW = "name is too short"


const validate = (body) => {
    let validationResult = {
        status: VALID,
        errors: []
    }
    if(typeof body.age !== 'number'){
        validationResult.status = INVALID
        validationResult.errors.push(AGE_IS_NOT_A_NUMERIC)
    }
    if(typeof body.name !== 'string'){
        validationResult.status = INVALID
        validationResult.errors.push(NAME_IS_NOT_A_STRING)
    }
    if(body.name.length <= minNameLength){
        validationResult.status = INVALID
        validationResult.errors.push(NAME_LENGTH_LOW)
    }

    return validationResult
}
let normalize = (body) => {
    body.name = body.name.charAt(0).toUpperCase() + body.name.slice(1);
}



module.exports = {validate, normalize, VALID, INVALID}