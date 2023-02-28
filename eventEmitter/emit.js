const path = require('path');
const Event = require(path.resolve(__dirname, 'eventEmitter.js'));

// console.log(Event)
const eventIns = new Event();

const cb = arg1 => console.log(arg1)


eventIns.on('newListenter', type => {
    console.log(type)
})

eventIns.on('事件1', cb)
eventIns.emit('事件1', 1)
eventIns.once('once事件', cb)
eventIns.off('once事件', cb)
eventIns.emit('once事件', 'once')
eventIns.emit('once事件', 'once')

