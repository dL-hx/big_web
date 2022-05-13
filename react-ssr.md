## React SSR 介绍

作者：大白菜
链接：https://zhuanlan.zhihu.com/p/362315215
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



文章输出来源 - 拉勾教育大前端高薪训练营

### 1、React SSR 介绍

什么是客户端渲染

- CSR：Client Side Rendering
- 服务器端仅返回 JSON 数据, DATA 和 HTML 在客户端进行渲染.

什么是服务端渲染

- SSR：Server Side Rendering
- 服务器端返回HTML, DATA 和 HTML 在服务器端进行渲染.

客户端渲染存在的问题

- 首屏等待时间长, 用户体验差
- 页面结构为空, 不利于 SEO

SPA 应用中服务器端渲染解决的问题



![img](https://pic2.zhimg.com/v2-02e1494f8536d54a154c4064fa904897_720w.jpg?source=d16d100b)![img](https://pic2.zhimg.com/80/v2-02e1494f8536d54a154c4064fa904897_720w.jpg?source=d16d100b)





![img](https://pic1.zhimg.com/v2-287098b8821de8d89eaacc0df9058b2a_720w.jpg?source=d16d100b)![img](https://pic1.zhimg.com/80/v2-287098b8821de8d89eaacc0df9058b2a_720w.jpg?source=d16d100b)



React SSR 同构

同构指的是代码复用. 即实现客户端和服务器端最大程度的代码复用.

### 2、项目结构初始化

项目结构

```text
-- react-ssr   
     src 源代码文件夹  
       client 客户端代码    
       server 服务器端代码     
       share  同构代码
```



### 3、服务器端渲染快速开始

创建 Node 服务器

```js
import express from 'express';
const app = express();

app.use(express.static('public'));

app.listen(3000, () => console.log('server is listening on 3000'))

export default app;

// index.js

import app from './http';

app.get('/', (req, res) => {

});
```

实现 React SSR

1. 引入要渲染的 React 组件
2. 通过 renderToString 方法将 React 组件转换为 HTML 字符串
3. 将结果HTML字符串想到到客户端

renderToString 方法用于将 React 组件转换为 HTML 字符串, 通过 react-dom/server 导入.

实现 React SSR 雏形

```js
// share/pages/home.js
import React from 'react';

function Home () {
  return <div> Home Works</div>
}

export default Home

// server index.js
import app from './http';
import Home from '../share/pages/Home';
import { renderToString } from 'react-dom/server';


app.get('/', (req, res) => {
  const content = renderToString(<Home />)
  res.send(`
    <html>
      <head>
      <title>React SSR </title>
      </head>
      <body>
        <div id="root">${content}<div>
      </body>
    </html>
  `)
});
```

### 4、服务器端程序webpack 打包配置

```js
// webpack.server.js
const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './src/server/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage"
                }
              ],
              "@babel/preset-react"
            ]
          }
        }
      }
    ]
  }
}


// package.json
"scripts": {
  "dev:server-build": "webpack --config webpack.server.js"
}
```

执行 npm run dev:server-build 进行打包

![img](https://pic3.zhimg.com/v2-e00a166284d6985d98d158c8319027f2_720w.jpg?source=d16d100b)![img](https://pic3.zhimg.com/80/v2-e00a166284d6985d98d158c8319027f2_720w.jpg?source=d16d100b)

![img](https://pica.zhimg.com/v2-b9431ffabb400d3cc1d441c304f1fcb0_720w.jpg?source=d16d100b)![img](https://pica.zhimg.com/80/v2-b9431ffabb400d3cc1d441c304f1fcb0_720w.jpg?source=d16d100b)



由服务器端发送到客户端

webpack 打包配置

问题: Node 环境不支持 ESModule 模块系统, 不支持 JSX 语法.

解决项目自动打包，项目启动命令配置

1. 配置服务器端打包命令: "dev:server-build": "webpack --config webpack.server.js --watch"
2. 配置服务端启动命令: "dev:server-run": "nodemon --watch build --exec \"node build/bundle.js\""

### 5、为组件元素附加事件的方式

实现思路分析

在客户端对组件进行二次"渲染", 为组件元素附加事件. 

客户端二次 "渲染" hydrate

使用 hydrate 方法对组件进行渲染, 为组件元素附加事件. hydrate 方法在实现渲染的时候, 会复用原本已经存在的 DOM 节点, 减少重新生成节点以及删除原本 DOM 节点的开销. 通过 react-dom 导入 hydrate.

```js
ReactDOM.hydrate(<App />, document.querySelector('#root'))
// client.js

import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../share/pages/Home';

ReactDOM.hydrate(<Home />, document.getElementById('root'))
```

客户端 React 打包配置

1. webpack 配置 打包目的: 转换JSX语法, 转换浏览器不识别的高级 JavaScript 语法 打包目标位置: public 文件夹
2. 打包启动命令配置 "dev:client-build": "webpack --config webpack.client.js --watch"

```js
// 新建webpack.client.js

const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage"
                }
              ],
              "@babel/preset-react"
            ]
          }
        }
      }
    ]
  }
}
```

修改打包配置

```js
"scripts": {
    "dev:server-build": "webpack --config webpack.server.js --watch",
    "dev:server-run": "nodemon --watch build --exec \"node build/bundle.js",
    "dev:client-build": "webpack --config webpack.client.js --watch"
  },
```

添加客户端包文件请求链接

在响应给客户端的 HTML 代码中添加 script 标签, 请求客户端 JavaScript 打包文件.

```js
<html>
  <head>
  <title>React SSR </title>
  </head>
  <body>
    <div id="root">${content}<div>
    <script src="bundle.js"></script>
  </body>
</html>
```

服务器端实现静态资源访问

服务器端程序实现静态资源访问功能, 客户端 JavaScript 打包文件会被作为静态资源使用.

```js
// http.js
app.use(express.static('public'));
```

### 6 优化webpack 配置

合并 webpack 配置

服务器端 webpack 配置和客户端 webpack 配置存在重复. 将重复配置抽象到 webpack.base.js 配置文件中.

```js
// webpack.base.js
module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage"
                }
              ],
              "@babel/preset-react"
            ]
          }
        }
      }
    ]
  }
};


// webpack.client.js
const path = require("path");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  }
};

module.exports = merge(baseConfig, config);

// webpack.server.js
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const nodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  entry: './src/server/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  externals: [nodeExternals()]
}

module.exports = merge(baseConfig, config);
```

### 7、合并项目启动命令

目的: 使用一个命令启动项目, 解决多个命令启动的繁琐问题. 通过 npm-run-all 工具实现.

```js
"dev": "npm-run-all --parallal dev:*";
```

### 8、服务端打包体积优化

```js
问题：在服务器端打包文件中, 包含了 Node 系统模块. 导致打包文件本身体积庞大.
解决：通过 webpack 配置剔除打包文件中的 Node 模块.
const nodeExternals = require('webpack-node-externals');

// 调用
const config = {
  target: 'node',
  entry: './src/server/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  externals: [nodeExternals()]
}
```

### 9、优化代码拆分

将启动服务器代码和渲染代码进行模块化拆分

优化代码组织方式, 渲染 React 组件代码是独立功能, 所以把它从服务器端入口文件中进行抽离.

```js
// 新建render.js
import React from 'react';
import Home from '../share/pages/Home';
import { renderToString } from 'react-dom/server';

export default () => {
  const content = renderToString(<Home />);
  return `
  <html>
    <head>
    <title>React SSR </title>
    </head>
    <body>
      <div id="root">${content}<div>
      <script src="bundle.js"></script>
    </body>
  </html>
  `
}

// index.js
import app from './http';
import render from './render';

app.get('/', (req, res) => {
  res.send(render());
});
```

### 10、实现服务器端路由

实现思路分析

在 React SSR 项目中需要实现两端路由.  客户端路由是用于支持用户通过点击链接的形式跳转页面.  服务器端路由是用于支持用户直接从浏览器地址栏中访问页面. 客户端和服务器端公用一套路由规则.

1、编写路由规则

```js
import Home from '../share/pages/Home';
import List from '../share/pages/List';

export default [{
  path: '/',
  component: Home,
  exact: true
}, {
  path: '/list',
  ...List
}]
```

实现服务器端路由

1. Express 路由接收任何请求 Express 路由接收所有 GET 请求, 服务器端 React 路由通过请求路径匹配要进行渲染的组件.

```js
app.get('*', async (req, res) => {});
```

1. 服务器端路由配置 

```js
import { StaticRouter } from "react-router-dom";
import routes from "../share/routes";
import { renderRoutes } from "react-router-config";

export default (req, store) => {
  const content = renderToString(
      <StaticRouter location={req.path}>{renderRoutes(routes)}</StaticRouter>
  );
};


//server/render.js
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "../share/routes";


export default req => {
  const content = renderToString(<StaticRouter location={req.path}>{renderRoutes(routes)}</StaticRouter>);
  return `
  <html>
    <head>
    <title>React SSR </title>
    </head>
    <body>
      <div id="root">${content}<div>
      <script src="bundle.js"></script>
    </body>
  </html>
  `
}

// server/index.js
import app from './http';
import render from './render';

app.get('*', (req, res) => {
  res.send(render(req));
});
```

### 11、实现客户端路由

添加客户端路由配置

```js
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "../share/routes";


ReactDOM.hydrate(
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>,
  document.getElementById("root")
);
```

### 实现客户端 Redux

实现思路分析

在实现了 React SSR 的项目中需要实现两端 Redux. 客户端 Redux 就是通过客户端 JavaScript 管理 Store 中的数据. 服务器端 Redux 就是在服务器端搭建一套 Redux 代码, 用于管理组件中的数据. 客户端和服务器端共用一套 Reducer 代码. 创建 Store 的代码由于参数传递不同所以不可以共用.

实现客户端 Redux

1. 创建 Store

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../share/store/reducers';

const store = createStore(reducer, {}, applyMiddleware(thunk))

export default store
```

1. 配置 Store

```js
// 2
import { Provider } from 'react-redux';
import store from "./createStore";;

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// 
app.get("*", async (req, res) => {
  const store = createStore();
  res.send(renderer(req, store))
});

// 3share/pages/store/reducer/user.reducer.js
import axios from "axios";

export const FETCH_USER = "fetch_user";

export const fetchUser = () => async dispatch => {
  let response = await axios.get("https://jsonplaceholder.typicode.com/users");
  dispatch({
    type: FETCH_USER,
    payload: response
  });
};


// 5 share/pages/store/reducer/index.js
import { combineReducers } from "redux";
import userReducer from "./user.reducer";

export default combineReducers({
  user: userReducer
});

// 4 share/pages/store/actions/user.actions.js
import axios from "axios";

export const FETCH_USER = "fetch_user";

export const fetchUser = () => async dispatch => {
  let response = await axios.get("https://jsonplaceholder.typicode.com/users");
  dispatch({
    type: FETCH_USER,
    payload: response
  });
};


// client.index.js
import { Provide } from 'react-redux';
import store from './createStore';

ReactDOM.hydrate(
  <Provide store={store}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provide>,
  document.getElementById("root")
);
```

1. 创建 Action 和 Reducer
2. 配置 polyfill 由于浏览器不能识别异步函数代码, 所以需要 polyfill 进行填充.

### 实现服务器端REdux

1、创建 store

```js
// server/createStore.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../share/store/reducers';

export default () => createStore(reducer, {}, applyMiddleware(thunk))
```

2 配置 Store

```js
app.get('*', (req, res) => {
  const store = createStore();
  res.send(renderer(req, store));
});


// 2
import { Provider } from "react-redux";

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>{(routes)}</StaticRouter>
    </Provider>
  );
};
```

### 实现服务端Redux 二

服务器端 store 数据填充

问题：服务器端创建的 store 是空的, 组件并不能从Store中获取到任何数据. 解决：服务器端在渲染组件之前获取到组件所需要的数据.

1. 在组件中添加 loadData 方法, 此方法用于获取组件所需数据，方法被服务器端调用
2. 将 loadData 方法保存在当前组件的路由信息对象中.
3. 服务器端在接收到请求后，根据请求地址匹配出要渲染的组件的路由信息
4. 从路由信息中获取组件中的 loadData 方法并调用方法获取组件所需数据
5. 当数据获取完成以后再渲染组件并将结果响应到客户端

```js
function loadData (store) {
  store.dispatch(fetchUser())
}

const mapStateToProps = state => ({user: state.user});

export default {
  component: connect(mapStateToProps)(List),
  loadData
}

// router.js
import Home from '../share/pages/Home';
import List from '../share/pages/List';

export default [{
  path: '/',
  component: Home,
  exact: true
}, {
  path: '/list',
  ...List
}]
```



![img](https://pic3.zhimg.com/v2-d42f4d032c103585ec36e942b7fb9b83_720w.jpg?source=d16d100b)![img](https://pic3.zhimg.com/80/v2-d42f4d032c103585ec36e942b7fb9b83_720w.jpg?source=d16d100b)



### 实现服务端 Redux 3

- 客户端设置Store 初始状态

```js
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk)
)
```

React 警告消除

警告原因: 客户端 Store 在初始状态下是没有数据的, 在渲染组件的时候生成的是空 ul, 但是服务器端是先获取数据再进行的组件渲染, 所以生成的是有子元素的ul, hydrate 方法在对比的时候发现两者不一致, 所以报了个警告. 解决思路: 将服务器端获取到的数据回填给客户端, 让客户端拥有初始数据.

```js
const initialState = JSON.stringify(store.getState())
  return `
  <html>
    <head>
    <title>React SSR </title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script>window.INITIAL_STATE = ${initialState}</script>
      <script src="bundle.js"></script>
    </body>
  </html>

  // server/renderer.js
```

### Redux 支持

防范XSS攻击

```js
let response = {
  data: [{
    id:1,
    name: '<script><script>alert(1)</script>
  }]
}
```