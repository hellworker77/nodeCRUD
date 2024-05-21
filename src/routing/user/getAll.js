const sqliteData = require('../../storages/sqliteData')
const responseWrappers = require('../responseWrappers')

module.exports = async (request, response) => {
    responseWrappers.successfulResponse(response, await sqliteData.getUsers())
}