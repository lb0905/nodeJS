// node只支持UTF-8编码  3个字节表示一个汉字 



/*
 * ASCII 单字节表示一个字符 127 
 * GB2312  双字节表示一个汉字字符
 * UTF-8 是unicode的一种实现方式2个字节表示一个汉字  utf-8中3个字节表示一个汉字 
 * 
 */

// 声明buffer的方式  buffer缓冲区 内存 存储的是二进制数据  以16进制展示

let buffer =  Buffer.alloc(5)
// console.log(buffer)


let buffer1 = Buffer.from('张三')
// console.log(buffer1.length)
// console.log(buffer1.toString())

// console.log(0x16.toString())

let arr = [];
arr.push(buffer1)
console.log(arr.toString())
console.log(buffer1)