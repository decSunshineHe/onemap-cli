//页面等待loading操作
const ora = require("ora");
const async = require("async");
async function sleep(n) {
  var timer = null;
  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, n);
  });
}
//页面的loading效果
async function wrapLoading() {
  let fn = arguments[0];
  let message = arguments[1];
  let args = toArray(arguments).slice(2) || [];
  //判断当前的参数是否标准
  if (!isFn(fn) || !isString(message)) {
    console.log("params error");
  }
  const spiner = ora(message);
  spiner.start(); //开启加载
  try {
    let repos = await fn(...args);
    spiner.succeed();
    return repos;
  } catch (e) {
    console.log("错误", e);
    spiner.fail("request failed , refetching...");
    await sleep(1000);
    return wrapLoading(fn, message, ...args);
  }
}

function toArray(arr) {
  return Array.prototype.slice.call(arr);
}
function isFn(fn) {
  return typeof fn == "function";
}
function isString(str) {
  return typeof str == "string";
}

module.exports = {
  sleep,
  wrapLoading,
  toArray: toArray,
  isString: isString,
};
