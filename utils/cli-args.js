/**
 * 参数的格式化插件
 * @param cmd 当前命令行中的命令数据
 */
module.exports = clearArgs = (cmd) => {
  const args = {};
  cmd.options.forEach((o) => {
    const key = o.long.slice(2);
    //如果当前命令通过key能取到这个值，则存在这个值
    if (cmd[key]) args[key] = cmd[key];
  });
  return args;
};
