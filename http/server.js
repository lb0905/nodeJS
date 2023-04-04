const http = require('http');
const url = require('url');
const fs = require('mz/fs');
const path = require('path');
const mime = require('mime');


class Server {
    async handleRequest(req, res) {
        try {
            const { pathname } = url.parse(req.url, true);
            let currentPath = path.join(__dirname, pathname);
            const statObj = await fs.stat(currentPath);
            if (statObj.isDirectory()) {
                currentPath = path.join(currentPath, 'index.html');
                await fs.access(currentPath);
                this.sendFile(currentPath);
            } else {
                this.sendFile(currentPath, req, res)
            }
        } catch (e) {
            this.emitError(e, req, res)
        }
    }
    sendFile(currentPath, req, res) {
        res.setHeader('Content-Typr', mime.getType(currentPath) + ';charset=utf8');
        fs.createReadStream(currentPath).pipe(res);
    }
    emitError(err, req, res) {
        res.statusCode = 404;
        res.end('not found');
    }
    start(...args) {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args)
    }
}

let server = new Server();


server.start(3000, () => {
    console.log('server start')
})