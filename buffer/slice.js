function split(separator) {
    let arr = [];
    let pos = 0;
    let index;
    let length = Buffer.from(separator).length;
    while ((index = this.indexOf(separator, pos)) > 0) {
        arr.push(this.slice(pos, index));
        pos = index + length;
    }
    arr.push(this.slice(pos))
    return arr;
}

Buffer.prototype.split = split;
let buf1 = Buffer.from('张三李四张三李四张三李四张三李四张三')


let buf = buf1.split('李四')
buf[0][0]++
console.log(buf.toString())
console.log(buf1.toString())








//  张三 李四 张三 李四 张三 李四 张三 李四

// var str = '张三李四'
// console.log(str.indexOf('李四'))
// console.log(str.length)

// let buffer = Buffer.from('张三李四')
// console.log(buffer.length)
// console.log(buffer.indexOf('李四'))