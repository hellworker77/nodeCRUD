const sqliteData = require('../../storages/sqliteData')
const responseWrappers = require('../responseWrappers')

module.exports = async (request, response) => {
    const id = parseInt(request.url.split('/')[2])

    const user = await sqliteData.getUserById(id)
    if(user){
        responseWrappers.successfulResponse(response, user)
        return
    }

    responseWrappers.userWithIdNotFound(response, id)
}