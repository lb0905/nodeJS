// const fs = require('fs');
// const obj = require('./test/1.js')
// console.log(obj)
const fs = require('fs');
const path = require('path')

// console.log(__dirname)

console.log(fs.readFileSync(path.resolve(__dirname, 'test/1.js'), 'utf-8'))

function fn(arg1) {
    console.log(...arguments)
}

fn('ds', 'sds')