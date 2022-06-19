// node的steam 模块实现了四个接口
// Readable (可读流)
// Writeable(可写流)
// Duplex(双工流)   实现了可读可写，但可读可写是独立的
// Transform(转换流)  实现了可读可写，并写可写流可以直接作为可读流的源数据
const { Duplex } = require("stream");
class MyDeplex extends Duplex {
    constructor(source) {
        super();
        this.source = source
    }
    _read() {
        let data = this.source.shift() || null;
        this.push(data)
    }
    _write(chunk, en, next) {
        process.stdout.write(chunk);
        process.nextTick(next)
    }
}
//模拟的源数据
let source = ["a", "b", "c"];
let myDeplex = new MyDeplex(source);

//实现了EventEmiter, 监听data事件，输出读取得数据
myDeplex.on("data", (data) => {
    console.log(data.toString())
})

myDeplex.write("加油加油加油加油加油")