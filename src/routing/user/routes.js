const url = require('url')
const getAll = require('./getAll')
const getById = require('./getById')
const create = require('./create')
const update = require('./update')
const deleteById = require('./deleteById')
const erorrs = require('../errors')
const userRoutes = (request, response) => {
    const requestUrl = url.parse(request.url, true)
    const requestMethod = request.method
    const requestPath = requestUrl.pathname


    if (requestPath === '/users' && requestMethod === "GET") {
       getAll(request, response)
    } else if (requestPath.startsWith('/users/') && requestMethod === "GET") {
        getById(request, response)
    } else if (requestPath === '/users/' && requestMethod === "POST") {
        create(request, response)
    } else if (requestPath.startsWith('/users/') && requestMethod === "PUT") {
        update(request, response)
    } else if (requestPath.startsWith('/users/') && requestMethod === "DELETE") {
        deleteById(request, response)
    } else {
        erorrs.responseRouteNotFound(response)
    }
}

module.exports = userRoutes;