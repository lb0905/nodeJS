

class EventEmitter {
    on(eventName, callback) {
        let events = this.events || (this.events = {});
        if (eventName !== 'newListenter') {
            this.emit('newListenter', eventName)
        }
        events[eventName] ? events[eventName].push(callback) : events[eventName] = [callback];
    }
    once(eventName, listener) {
        let cb = (...args) => {
            listener.call(this, ...args);
            this.off(eventName, cb)
        }
        cb.l = listener;
        this.on(eventName, cb);
    }
    emit(eventName, ...args) {
        let cbs = this.events[eventName];
        if (cbs) {
            cbs.forEach(fn => {
                fn.call(this, ...args)
            });
        }
    }
    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(fn => fn != callback && fn.l != callback)
        }
    }
}


module.exports = EventEmitter