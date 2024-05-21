const responseWrapper = (response, object, code = 404) => {
    response.writeHead(code)
    response.end(JSON.stringify(object))
}

const responseRouteNotFound = (response) => {
    let object = {error_message: "Route not found"}
    responseWrapper(response, object, 404)
}

const userWithIdNotFound = (response, id) => {
    let object = {error_message: `User with id:(${id}) not found`}
    responseWrapper(response, object, 404)
}

const unableToDeleteUserById = (response, id) => {
    let object = {error_message: `Unable to delete user by id:(${id})`}
    responseWrapper(response, object, 400)
}

const userWrongDataProvided = (response, validationErrors) => {
    let object = {
        message: "Validation failure at",
        error_messages: validationErrors
    }
    responseWrapper(response, object, 400)
}

module.exports = {
    responseRouteNotFound,
    userWithIdNotFound,
    unableToDeleteUserById,
    userWrongDataProvided
}