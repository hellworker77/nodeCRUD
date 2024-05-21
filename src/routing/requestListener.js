const routes = require('./user/routes')
const responseWrappers = require('./responseWrappers')
const requestListener = async (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    try{
        await routes(request, response)
    }catch (error){
        responseWrappers.internalServerError(response, error)
    }
}


module.exports = requestListener;