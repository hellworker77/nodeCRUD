const http = require('http');
const requestListener = require('./routing/requestListener')

const server = http.createServer((req , res) => {
    requestListener(req, res)
});

const port = 8080
const address = '127.0.0.1'
server.listen(port, address, () => {
    console.log(`Listening on ${address}:${port}`);
});