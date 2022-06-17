

const path = require("path");
const fs = require("fs");
const vm = require("vm");
function Module(id) {
    this.id = id;
    this.exports = {};
    console.log("1111111")
}
Module._resolveFileName = function (fileName) {
    let absPath = path.resolve(__dirname, fileName);
    // 文件定位
    if (fs.existsSync(absPath)) {
        //如果该目录内容存在，返回该路径
        return absPath;
    } else {
        //如果不存在，补全后缀
        let suffixs = Object.keys(Module._extensions);
        for (let index = 0; index < suffixs.length; index++) {
            let newPath = absPath + suffixs[index];
            if (fs.existsSync(newPath)) return newPath;
        }
    }
}
Module.prototype.load = function () {
    let extname = path.extname(this.id);
    Module._extensions[extname](this);
}
Module._extensions = {
    ".js"(module) {
        //读取
        let content = fs.readFileSync(module.id, "utf-8");
        // 包装
        content = Module.wrapper[0] + content + Module.wrapper[1];
        // vm
        compileFn = vm.runInThisContext(content);
        //准备参数
        let exports = module.exports;
        let dirname = path.dirname(module.id);
        let fileName = module.id;
        //执行
        compileFn.call(exports, exports, myRequire, module, fileName, dirname);

    },
    ".json"() { }
}
Module.wrapper = [
    "(function (exports,require,module,filename,dirname) {",

    "})"
]
Module._cache = {}
function myRequire(fileName) {
    //1.路径解析 --转换成绝对路径
    let mPath = Module._resolveFileName(fileName);
    //2.缓存优先
    // let cacheModule = Module._cache[mPath];
    // if (cacheModule) return cacheModule.exports;

    // 3.创建新的Module实例
    let module = new Module(mPath);
    // 4.加载模块
    module.load();

    // 5.存入缓存
    Module._cache[mPath] = module;
    //6.返回
    return module.exports;

}

let obj = myRequire("./v");
let obj2 = myRequire("./v");
console.log(obj)