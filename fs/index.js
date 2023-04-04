const fs = require('fs')
const path = require('path')


// const name =  fs.readFileSync(path.resolve(__dirname, 'name.txt'), 'utf-8')

// fs.writeFileSync(path.resolve(__dirname, 'age.txt'), JSON.stringify({age:18}))


// console.log(name)

function copy(source, target) {
    fs.readFile(source, (err, data) =>{
        if (err) return;
        fs.writeFile(target, data, err => {
            
        })
    })
}


// copy(path.resolve(__dirname, 'age.txt'), path.resolve(__dirname, 'name.txt'))

console.log(fs.readFileSync('../tex7.txt', 'utf-8'))


