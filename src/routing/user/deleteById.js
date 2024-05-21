const data = require('../../storage/data')
const errors = require('../errors')

module.exports = (request, response) => {
    const id = parseInt(request.url.split('/')[2])
    if (!data.exists(id)){
        errors.userWithIdNotFound(response, id)
        return;
    }

    const wasDeleted = data.deleteUser(id)

    if(wasDeleted){
        response.writeHead(200)
        response.end(JSON.stringify({message: "User deleted"}))
        return
    }
    errors.unableToDeleteUserById(response, id)
}