// node 的事件循环机制
// node 10 以后跟浏览器循环机制一样
// 不同之处
// 1.任务队列数不一样
// 2.微任务执行不是按顺序，process.netTick 优于pr
//同步代码
//            宏任务  
//                   timer
//                   poll
//............       check  (按顺序按轮巡，当前是poll，下一个会指向check)
//             微任务
// setTimeout(() => {  // 宏任务 timer
//     console.log("s1");
// });

// console.log("start");
// process.nextTick(() => { //微任务，优于
//     console.log("tick")
// })

// setImmediate(() => { //宏任务 check
//     console.log("st")
// })
// console.log("end")

// start end tick node-p1 s1 st


setTimeout(() => {
    console.log("s1");
    Promise.resolve().then(() => {
        console.log("p1")
    })
    process.nextTick(() => {
        console.log("t1")
    })
});

Promise.resolve().then(() => {
    console.log("p2")
})

console.log("start");
setTimeout(() => {
    console.log("s2");
    Promise.resolve().then(() => {
        console.log("p3")
    })
    process.nextTick(() => {
        console.log("t2")
    })
});
console.log("end");

//start  end p2 s1 t1 p1 s2 t2 p3


//事件循环问题
//执行顺序不确定
setTimeout(() => {
    console.log("setTimeout");
});
setImmediate(() => {
    console.log("setImmediate");
});