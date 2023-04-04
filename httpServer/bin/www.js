#! /usr/bin/env node
let config = {
    host: '127.0.0.1',
    port: 3000,
    dir: process.cwd()
}

const  commander  = require('commander')
const json = require('../package.json')
const Server = require('../server.js');
commander.version(json.version)
.option('-p, --port <n>', 'set port')
.option('-o, --host <n>', 'set host')
.option('-d, --dir <n>', 'set dir')
.parse(process.argv)


config = {...config, ...commander.opts()};


let server = new Server(config);
server.start()

