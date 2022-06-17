const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
// recurive
// function mkDir(dirPath, callBack) {
//     let parts = dirPath.split("/");
//     let index = 1;
//     function next() {
//         if (index > parts.length) return callBack && callBack();
//         let current = parts.slice(0, index++).join('/');
//         fs.access(current, (err) => {
//             if (err) {
//                 fs.mkdir(current, next)
//             } else {
//                 next()
//             }
//         })
//     }
//     next();
// }

// promise
const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);

async function mkDir(dirPath, cb) {
    let parts = dirPath.split("/");
    console.log(parts);
    for (let index = 1; index <= parts.length; index++) {
        let path = parts.slice(0, index).join("/");
        console.log(path)
        try {
            await access(path);
        } catch (error) {
            await mkdir(path)
        }
    }
    cb & cb();
}
mkDir('a/b/c', () => {
    console.log("创建成功")
});