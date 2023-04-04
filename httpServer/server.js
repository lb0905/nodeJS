const fs = require('mz/fs')
const path = require('path')
const http = require('http')
const url = require('url')
const mime = require('mime')
const ejs = require('ejs')
const chalk = require('chalk')

const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8');
class Server {
    constructor(config) {
        this.host = config.host;
        this.port = config.port;
        this.dir = config.dir;
        this.template = template;
    }
    async handleRequest(req, res) {
        const { pathname } = url.parse(req.url);
        const currentPath = path.join(__dirname, pathname);
        try {
            const statObj = await fs.stat(currentPath);
            if (statObj.isDirectory()) {
                const dirs = await fs.readdir(currentPath);
                const arr = dirs.map(d => {
                    return {
                        href: path.join(pathname, d),
                        content: d
                    }
                })
                let str = ejs.render(this.template, { arr });
                res.setHeader('Content-Type', 'text/html;charset=utf8');
                res.end(str)
            } else {
                this.sendFile(currentPath, res)
            }
        } catch (error) {
            console.log(error);
            this.emitError(error, res)
        }
    }
    emitError(e, res) {
        res.statusCode = 404;
        res.end('Not Found')
    }
    sendFile(currentPath, res) {
        res.setHeader('Content-Type', mime.getType(currentPath) + ';charset=utf8');
        res.setHeader('Cache-Control', `max-age=${1000}`);
        res.setHeader('Expires', new Date(Date.now() + 10 *1000).toUTCString())
        fs.createReadStream(currentPath).pipe(res);
    }
    start() {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, this.host, () => {
            console.log(chalk.yellow(`starting up http-server, serving ${this.dir}`));
            console.log(chalk.green(`runing at http://${this.host}:${this.port}`))
        })
    }
}
module.exports = Server