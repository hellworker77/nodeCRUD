const data = require('../../storage/data')
const errors = require('../errors')

module.exports = (request, response) => {
    const id = parseInt(request.url.split('/')[2])
    const user = data.getUserById(id)

    if(user){
        response.writeHead(200)
        response.end(JSON.stringify(user))
        return
    }
    errors.userWithIdNotFound(response, id)
}