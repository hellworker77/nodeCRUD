const data = require('../../storage/data')


module.exports = (request, response) => {
    response.writeHead(200)
    response.end(JSON.stringify(data.getUsers()))
}