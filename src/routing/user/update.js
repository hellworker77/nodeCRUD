const data = require('../../storage/data')
const errors = require('../errors')
const utilities = require("../utilities");

module.exports = (request, response) => {
    const id = parseInt(request.url.split('/')[2])
    let json = ''

    if(!data.exists(id)){
        errors.userWithIdNotFound(response, id)
        return;
    }

    request.on('data', chunk => {
        json += chunk
    })

    return request.on('end', () => {
        const body = JSON.parse(json)

        let validationResult = utilities.validate(body)
        if(validationResult.status === utilities.INVALID){
            errors.userWrongDataProvided(response, validationResult.errors)
            return
        }

        utilities.normalize(body)

        const user = {
            name: body.name,
            age: parseInt(body.age)
        }

        let updatedUser = data.updateUser(id, user)

        response.writeHead(200)
        response.end(JSON.stringify(updatedUser))
    })
}