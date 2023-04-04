// const http = require('http')

let arr = ['a', 'b', 'c'];

let d = [{}, {}, {}]


for (let s in arr) {
    let fn = function() {
        console.log(s)
    }
    d[s].fn = fn
}


d[1].fn()

