
const sqliteData = require('../../storages/sqliteData')

const responseWrappers = require('../responseWrappers')

module.exports = async (request, response) => {
    const id = parseInt(request.url.split('/')[2])

    const wasDeleted = await sqliteData.deleteUserById(id)

    if(wasDeleted){
        responseWrappers.successfulResponse(response, {message: "User deleted"})
        return
    }
    responseWrappers.unableToDeleteUserById(response, id)
}