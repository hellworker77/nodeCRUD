const data = require('../../storage/data')
const errors = require('../errors')
const utilities = require('../utilities')

module.exports = (request, response) => {
    let json = ''

    request.on('data', chunk => {
        json += chunk
    })

    request.on('end', () => {
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

        data.addUser(user);
        response.writeHead(200)
        response.end(JSON.stringify(user))

    })
}