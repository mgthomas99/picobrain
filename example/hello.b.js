var fs = require("fs");
var bf = require("./..");

var code = fs.readFileSync("./hello.b", { encoding: "utf-8" });
console.log(bf(code));
