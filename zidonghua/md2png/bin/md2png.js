#!/usr/bin/env node

// 如果你需要这个文件是 CLI 执行时的入口，就必须通过项目的 package.json 中的 bin 字段声明

// CLI 入口的作用：
// 1. 解析 CLI 参数 process.argv
// 2. 调用模块中功能实现

const program = require("commander");
const inquirer = require("inquirer");
const pkg = require("../package");
const md2Png = require("..");

program
  .version(pkg.version)
  .usage("<input>") // 用户传递过来的 md 文件路径
  .option("-o, --output <output>", "输出图片文件路径") // flag 参数
  .option("-w, --width <width>", "输出图片宽度")
  // .option("-H, --host <s>", "Email host")

  // .on('--help', console.log)
  .parse(process.argv)
  .args.length || program.help();

// const { args, host } = program;
// const [input] = args;
// console.log(args, host);

// if (!program.args.length) {
//   program.help()
// }
inquirer
  .prompt([{ type: "number", name: "width", message: "Image width" }])
  .then((answers) => {
    const { args, output, width } = program;
    const [input] = args; // 传递过来的文件路径

    // console.log(program)
    // ~~ xx 快速把字符串转换为数字 类型
    md2Png(input, { output, width: ~~answers.width }); // 调用模块实现功能
  });
