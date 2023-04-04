const fsPromises = require('fs/promises')
const fs = require('fs')
const path = require('path')

// fsPromises.mkdir(path.resolve(__dirname, 'c/d'))


function mkdirSynk(pathStr) {
    const arr = pathStr.split('/');
    let currentPath;
    for (const [index] of arr.entries(arr)) {
        currentPath = arr.slice(0, index + 1).join('/')
        try {
            fs.accessSync(currentPath);
        } catch (error) {
            fs.mkdirSync(currentPath);
        };
    };
}

function mkdir(pathStr) {
    const arr = pathStr.split('/');
    function next(index) {
        let currentPath = arr.slice(0, index + 1).join('/');
        if (index < arr.length) {
            fs.access(currentPath, err => {
                if (err) {
                    fs.mkdir(currentPath, err => {
                        next(++index)
                    })
                } else {
                    next(++index)
                }
            })
        }
    }
    next(0)
}

// mkdir('a/b/c/d')

let reg = /[a-z]+(?=(?:[a-z\/])+$)/

function rmdirSync(dir) {
    let statObj = fs.statSync(dir);
    if (statObj.isDirectory()) {
        let arr = fs.readdirSync(dir);
        for (let i = 0; i < arr.length; i++) {
            rmdirSync(path.join(dir, arr[i]))
        }
        fs.rmdirSync(dir)
    } else {
        fs.unlinkSync(dir)
    }
}

function rmdirSync2(dir) {
    let arr = [dir], index = 0, current;
    while (current = arr[index++]) {
        const statObj = fs.statSync(current);
        if (statObj.isDirectory()) {
            let arr1 = fs.readdirSync(current).map(item => path.join(current, item));
            arr = [...arr, ...arr1];
        } else {
            fs.unlinkSync(dir)
        }
    }
    arr.reduceRight((accumulator, cur) => {
        fs.rmdirSync(cur)
    }, undefined)
}
// rmdirSync2('a')



function rmdir(dir, callback) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            fs.readdir(dir, (err, dirs) => {  // b c
                dirs = dirs.map(d => path.join(dir, d));
                function next(index) {
                    if (index === dirs.length) {
                        return fs.rmdir(dir, callback)
                    }
                    rmdir(dirs[index], () => next(++index))
                }
                next(0)
            })
        } else {
            console.log('wenjian')
            fs.unlink(dir, callback)
        }
    })
}

// rmdir('a', () => console.log('shanchuwancheng'))
function rmdir2(dir, callback) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            fs.readdir(dir, (err, dirs) => {
                if (dirs.length === 0) {
                    return fs.rmdir(dir, callback) // 4 5
                }
                for (const item of dirs) {
                    const cDir = path.join(dir, item);
                    rmdir2(cDir, done);  // 1 a/b 2 a/c
                }
                let index = 0; // 3 0
                function done() {
                    if (++index == dirs.length) {
                        fs.rmdir(dir, callback)
                    }
                }
            })
        } else {
            fs.unlink(dir, callback)
        }
    })
}

// rmdir2('a', () => console.log('shanchuwancheng'))



