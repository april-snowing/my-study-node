const fs = require("fs");
const { resourceLimits } = require("worker_threads");
let rs = fs.createReadStream("text.txt", {
    flags: "r",  // 操作文件的方式，可读，可写
    encoding: null, //文件读取 编码格式
    fd: null, // 文件标识符 默认从3开始  0 1 2 被标准输入 输出 错误占用
    mode: 438, //权限位 默认值 rw 八进制 0O66 十进制 438
    autoClose: true, //自动关闭文件
    start: 0, //读取开始位置
    //end: 3,//读取结束时间
    highWaterMark: 4//每次读取到缓冲区多少字节的数据
});
//消费读取的数据
// 1.监听data事件  
// rs.on('data', (chunk) => {
//     console.log(chunk.toString());  //流式读取
//     rs.pause(); //切换暂停模式
//     setTimeout(() => {
//         rs.resume() // 恢复读取模式
//     }, 1000);
// })
// 2.监听readable事件
rs.on("readable", () => {
    let data;
    // rs.read(1) 传入的数据是每次从缓冲区消耗的数据字节 
    // 当缓冲区的数据字节数不够消费的时候，就会触发_read()往缓冲区读取数据供read去消费
    while ((data = rs.read(1)) !== null) {
        console.log(data.toString())
    }
})