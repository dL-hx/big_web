https://blog.csdn.net/weixin_38550182/article/details/112597108

### 全局安装 yeoman
yarn global add install yo
npm install -g yo

### 全局安装generator-node
> 创建node module
yarn global add install generator-node

> mkdir my-module

> cd my-module\

> yo node

// 创建包的名字
my-module

// 选择描述
awesome node module

// 选择仓库地址
https://github.com/dL-hx/my-module

// 设置关键词
// module,node

MIT协议


travis ci


// sub-generator 生成器,生成cli 应用的生成器

生成cli
//  yo node:cli

链接到link全局
yarn link

yarn 安装项目依赖项
> yarn

// 安装webapp生成器
yarn global add generator-webapp

// 生成web应用命令
yo webapp

// 自定义generator

generator-<name>


2、 yeoman generator的模块名称必须是如下格式generator-name
mkdir generator-sample
cd generator-sample
yarn init 创建一个package.json
yarn add yeoman-generator 这个模块提供了生成器的基类，这个基类提供了一些工具函数，让在创建生成器的时候更加便捷
code . 通过vscode打开这个目录
按照上述特定结构创建目录文件


cd …
mkdir my-proj
cd my-proj
---------
yarn link
yo sample 就会创建一个叫temp.txt文件
--------

ejs模板学习
https://ejs.bootcss.com/#features


// 接收用户输入
// 实现promiting方法


// 实现自定义的vue模板
yarn init

增加一个% , 使得模板标记转义,原样生成文件
<%%= BASE_URL %>
 

### Plop 小型的脚手架工具
一个小而美的脚手架工具包
// 用来快速生成项目模板文件

yarn add plop --save