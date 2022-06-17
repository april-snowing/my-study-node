const fs = require("fs");;
const path = require("path");

//需求 ：接收一个路径， 删除一个非空目录
// 1.判断传入的路径是文件还是目录，如果文件直接删除
// 2.如果是目录，继续读取目录内容执行删除操作
// 3.递归调用读取删除操作
// 4.把当前目录拼接成一个可以删除的路径

function rmMyDir(dirPath, cb) {

    fs.stat(dirPath, (erqr, statObj) => {
        //如果传入的路径是个目录
        if (statObj.isDirectory()) {
            //读取该目录的内容
            fs.readdir(dirPath, (err, files) => {
                let dirs = files.map(dir => path.join(dirPath, dir));
                let index = 0;
                function next() {
                    if (dirs.length === index) return fs.rmdir(dirPath, cb);
                    let current = dirs[index++];
                    console.log(current)
                    rmMyDir(current, next)
                }
                next();
            })
        } else {
            //如果传入的路径是个文件
            fs.unlink(dirPath, cb)
        }
    })
}
rmMyDir("temp", () => {
    console.log("删除成功")
})
