const sqliteData = require('../../storages/sqliteData')

const responseWrappers = require('../responseWrappers')
const utilities = require('../utilities')

module.exports = async (request, response) => {
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

        let cratedUser = await sqliteData.createUser(user);
        responseWrappers.successfulResponse(response, cratedUser)
    })
}