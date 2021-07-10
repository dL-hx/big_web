import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App1'; // 基本表单
// import App from './App2'; // 表单验证
// import App from './App3'; // 表单验证
// import App from './App4'; // 表单验证 yup
// import App from './App5'; //使用getFieldProps方法简化表单代码
// import App from './App6'; // 使用组件方式构建表单
// import App from './App7'; //构建其他表单
// import App from './App8'; //自定义表单控件  input
import App from './App9'; //自定义表单控件   复选框类的

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
