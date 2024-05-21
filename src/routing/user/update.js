const sqliteData = require('../../storages/sqliteData')

const responseWrappers = require('../responseWrappers')
const utilities = require("../utilities");

module.exports = async (request, response) => {
    const id = parseInt(request.url.split('/')[2])
    let json = ''

    await request.on('data', chunk => {
        json += chunk
    })

    await request.on('end', async () => {
        const body = JSON.parse(json)

        let validationResult = utilities.validate(body)
        if(validationResult.status === utilities.INVALID){
            responseWrappers.userWrongDataProvided(response, validationResult.errors)
            return
        }

        utilities.normalize(body)

        const user = {
            name: body.name,
            age: parseInt(body.age)
        }

        let updatedUser = await sqliteData.updateUser(id, user)

        responseWrappers.successfulResponse(response, updatedUser)
    })
}