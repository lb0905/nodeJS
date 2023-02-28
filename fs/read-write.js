const fs = require('fs')
const path = require('path')

const buf = Buffer.from('23');
// console.log(buf.toString())
fs.open(path.resolve(__dirname, 'age.txt'), 'w', (err, fd) => {
    fs.write(fd, buf, 0, 2, 0, (err) => {
        if (!err) {
            // fs.write()
        }
    })
})

function copy(source, target) {
    let buf = Buffer.alloc(3), pos = 0;
    fs.open(source, 'r', (err, rfd) => {
        fs.open(target, 'w', (err, wfd) => {
            function next() {
                fs.read(rfd, buf, 0, 3, pos, (err, bytesRead) => {
                    if (bytesRead > 0) {
                        pos += bytesRead;
                        fs.write(wfd, buf, 0, bytesRead, (err, written) => {
                            next();
                        });
                    } else {
                        fs.close(rfd)
                        fs.close(wfd)
                    }
                })
            }
            next()
        })
    })
}

copy(path.resolve(__dirname, 'age.txt'), path.resolve(__dirname, 'name.txt'))