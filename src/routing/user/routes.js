const url = require('url')
const getAll = require('./getAll')
const getById = require('./getById')
const create = require('./create')
const update = require('./update')
const deleteById = require('./deleteById')
const responseWrappers = require('../responseWrappers')
const userRoutes = async (request, response) => {
    const requestUrl = url.parse(request.url, true)
    const requestMethod = request.method
    const requestPath = requestUrl.pathname


    if (requestPath === '/users' && requestMethod === "GET") {
        await getAll(request, response)
    } else if (requestPath.startsWith('/users/') && requestMethod === "GET") {
        await getById(request, response)
    } else if (requestPath === '/users/' && requestMethod === "POST") {
        await create(request, response)
    } else if (requestPath.startsWith('/users/') && requestMethod === "PUT") {
        await update(request, response)
    } else if (requestPath.startsWith('/users/') && requestMethod === "DELETE") {
        await deleteById(request, response)
    } else {
        responseWrappers.responseRouteNotFound(response)
    }
}

module.exports = userRoutes;