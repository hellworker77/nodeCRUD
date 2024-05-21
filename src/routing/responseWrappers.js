const baseWrapper = (response, object, code = 404) => {
    response.writeHead(code)
    response.end(JSON.stringify(object))
}

const responseRouteNotFound = (response) => {
    let object = {error_message: "Route not found"}
    baseWrapper(response, object, 404)
}

const userWithIdNotFound = (response, id) => {
    let object = {error_message: `User with id:(${id}) not found`}
    baseWrapper(response, object, 404)
}

const unableToDeleteUserById = (response, id) => {
    let object = {error_message: `Unable to delete user by id:(${id})`}
    baseWrapper(response, object, 400)
}

const userWrongDataProvided = (response, validationErrors) => {
    let object = {
        message: "Validation failure at",
        error_messages: validationErrors
    }
    baseWrapper(response, object, 400)
}
const internalServerError = (response, error ) => {
    let object = {
        error_messages: "Internal server error",
        error: error
    }
    baseWrapper(response, object, 500)
}
const successfulResponse = (response, object) => {
    baseWrapper(response, object, 200)
}
module.exports = {
    responseRouteNotFound,
    userWithIdNotFound,
    unableToDeleteUserById,
    userWrongDataProvided,
    internalServerError,
    successfulResponse
}