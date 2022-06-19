const EventEmitter = require("events");

const ev = new EventEmitter();

ev.on("事件2", () => {
    console.log("事件1调用了")
})

ev.emit("事件2")

class Pubsub {
    constructor() {
        this._events = []
    }
    subscribe(event, callback) {
        //如果已存在订阅事件
        if (this._events[event]) {
            this._events[event].push(callback);
        } else {
            this._events[event] = [callback];
        }
    }
    publish(event, ...args) {
        this._events[event].forEach(items => {
            items.call(this, args)
        });
    }
}
let pb = new Pubsub();
pb.subscribe("事件1", function (...args) {
    console.log(...args)
})
pb.publish("事件1", 1, 2, 3, 4);
