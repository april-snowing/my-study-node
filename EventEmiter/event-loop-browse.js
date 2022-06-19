// node 的事件循环机制

//同步代码
//            宏任务
//                   timer
//                   poll
//............       check
//             微任务
setTimeout(() => {  // 宏任务 timer
    console.log("s1");
});
Promise.resolve().then(() => {   // 微任务
    console.log("node-p1")
})
console.log("start");
process.nextTick(() => { //微任务，优于
    console.log("tick")
})

setImmediate(() => {
    console.log("setImmediate")
})
console.log("end")