const { Transform } = require("stream");
const { createBrotliCompress } = require("zlib");
class MyTransform extends Transform {
    constructor() {
        super();
    }
    _transform(chunk, en, callback) {
        this.push(chunk.toString().toUpperCase());
        //error,成功的回调
        callback(null)
    }
}

let myTransform = new MyTransform();
myTransform.write("I am April");
myTransform.on("data", (data) => {
    console.log(data.toString());
})