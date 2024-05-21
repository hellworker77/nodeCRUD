const routes = require('./user/routes')
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    routes(request, response)
}


module.exports = requestListener;