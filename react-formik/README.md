## Fomik 简介
### 1.1 formik介绍
增强表单处理能力, 简化表单处理流程

### 1.2 formik下载
npm install formik -S

### 2.1 formik基本使用
使用formik 进行表单数据绑定以及表单提交处理.
``` jsx
import React, { Component } from 'react'
import { useFormik } from 'formik';

function App () {
  const formik = useFormik({initialValues: {
    username: '张三'
  }, onSubmit: values => {}});
  return <form onSubmit={formik.handleSubmit} >
    <input type="text" name="username"
    value={formik.values.username}
    onChange={formik.handleChange}
    />
    <input type="submit"/>
  </form>
}

export default App
```

### 2.2 表单验证 
2.2.1 初始化验证方式
``` jsx
const formik = useFormik({
    validate: values => {
        const errors = {};
        if (!values.username) errors.username = '请输入用户名';
        return errors;
    },
  })
  return <form>
    {formik.errors.username ? <div>
      {formik.errors.username}
    </div>: null}
  </form>
```


``` jsx

function App2() {
  const formik = useFormik({initialValues: {// 返回一个对象 formik
    username: '张三',
    password:'123456'
  }, 
  
  validate: values => {
    const errors = {};
    if (!values.username) {
      errors.username = '用户名不能为空';
    } else if (values.username.length > 15) {
      errors.username = '用户名的长度不能大于15'
    }


    if (!values.password) {
      errors.password = '密码不能为空';
    } else if (values.password.length < 6) {
      errors.password = '密码的长度不能小于6'
    }
    return errors
  },
  
  onSubmit: values => {// 在这里获取表单所有输入的值
    console.log(values);
  }});

  return (
    <form onSubmit={formik.handleSubmit} >
      <input name='username' type='text'     value={formik.values.username} onChange={formik.handleChange}/>
      <p>{ formik.errors.username ? formik.errors.username : null}</p>

      <input name='password' type='password' value={formik.values.password} onChange={formik.handleChange}/>
      <p>{ formik.errors.password ? formik.errors.password : null}</p>

      <input type='submit'/>
    </form>
  );
}

export default App2;
```


2.2.2 完善错误信息提示时的用户体验
1 开启离开焦点时触发验证
``` jsx
onBlur = {formik.handleBlur}
```
2 提示信息时检查表单元素的值是否被改动过
表单项对象是否被改动了 , 并且 出错了
``` jsx
{formik.touched.username && formi.error.username ? <div>{formik.errors.username}</div> : null}
```

案例
```jsx
import React from 'react';
import {useFormik} from 'formik';// 增强表单

// 表单验证2 (离开焦点时候验证)
// 验证表单数据有效性
function App3() {
  const formik = useFormik({initialValues: {// 返回一个对象 formik
    username: '',
    password:''
  }, 
  
  validate: values => {
    const errors = {};
    if (!values.username) {
      errors.username = '用户名不能为空';
    } else if (values.username.length > 15) {
      errors.username = '用户名的长度不能大于15'
    }


    if (!values.password) {
      errors.password = '密码不能为空';
    } else if (values.password.length < 6) {
      errors.password = '密码的长度不能小于6'
    }
    return errors
  },
  
  onSubmit: values => {// 在这里获取表单所有输入的值
    console.log(values);
  }});

  return (
    <form onSubmit={formik.handleSubmit} >
      <input name='username' type='text'    value={formik.values.username} onChange={formik.handleChange} onBlur = {formik.handleBlur} />
      <p>{ formik.touched.username && formik.errors.username ? formik.errors.username : null}</p>

      <input name='password' type='password' value={formik.values.password} onChange={formik.handleChange} onBlur = {formik.handleBlur} />
      <p>{ formik.touched.password && formik.errors.password ? formik.errors.password : null}</p>

      <input type='submit'/>
    </form>
  );
}

export default App3;

```

2.2.3 formik配合yup进行表单验证
使用yup 验证
下载yup
```
npm install yup -S
```
引入yup


```
import * as Yup from 'yup';


// 定义验证规则
 validationSchema: Yup.object({
   username: Yup.string().max(15, '用户名的长度不能大于15').required('请输入用户名'),
   password: Yup.string().min(6, '密码长度不能小于6').required('请输入密码'),
 }),
  
```



``` jsx
import React from 'react';
import {useFormik} from 'formik';// 增强表单
import * as Yup from 'yup';



// 使用Yup schema增强表单验证规则
// 焦点离开时,  发生校验

function App4() {
  const formik = useFormik({initialValues: {// 返回一个对象 formik
    username: '',
    password:''
  }, 
  /* 
    validate: values => {
    const errors = {};
    if (!values.username) {
      errors.username = '用户名不能为空';
    } else if (values.username.length > 15) {
      errors.username = '用户名的长度不能大于15'
    }


    if (!values.password) {
      errors.password = '密码不能为空';
    } else if (values.password.length < 6) {
      errors.password = '密码的长度不能小于6'
    }
    return errors
  },
  */
 // 定义验证规则
 validationSchema: Yup.object({
   username: Yup.string().max(15, '用户名的长度不能大于15').required('请输入用户名'),
   password: Yup.string().min(6, '密码长度不能小于6').required('请输入密码'),
 }),
  
  onSubmit: values => {// 在这里获取表单所有输入的值
    console.log(values);
  }});

  return (
    <form onSubmit={formik.handleSubmit} >
      <input name='username' type='text'    value={formik.values.username} onChange={formik.handleChange} onBlur = {formik.handleBlur} />
      <p>{ formik.touched.username && formik.errors.username ? formik.errors.username : null}</p>

      <input name='password' type='password' value={formik.values.password} onChange={formik.handleChange} onBlur = {formik.handleBlur} />
      <p>{ formik.touched.password && formik.errors.password ? formik.errors.password : null}</p>

      <input type='submit'/>
    </form>
  );
}

export default App4;

```


2.2.4 使用getFieldProps方法简化表单代码
减少样板代码
``` jsx
{...formik.getFieldProps('username')}

<input
  type="password"  
  name="password"
  {...formik.getFieldProps('password')}
/>
```

2.2.5 使用组件方式构建表单
``` jsx
import {Formik, Form, Field, ErrorMessage} from 'formik';// 增强表单

function App(){
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}

    >
      <Form>
       <Field name='username' />
       <ErrorMessage name='username' />
       <button type='submit'>提交</button>
      </Form>
    </Formik>
  )
}

```


实例
``` jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // 增强表单

import * as Yup from "yup";

// 使用组件方式构建表单
// 使表单代码更加整洁

function App6() {
  const initialValues = {
    // 返回一个对象 formik
    username: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const schema = Yup.object({
    username: Yup.string()
      .max(15, "用户名的长度不能大于15")
      .required("请输入用户名"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />
        <input type="submit" />
      </Form>
    </Formik>
  );
}

export default App6;
```


2.2.6 构建其他表单
默认情况下，Field 组件渲染的是文本框，如要生成其他表单元素可以使用以下语法

``` jsx
<Field as="textarea" name="content" />
<Field as="select" name="subject" >
  <option value="java">java</option>
  <option value="js">js</option>
</Field>
```


``` jsx

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // 增强表单

import * as Yup from "yup";

// 构建其他表单
// as用法
function App7() {
  const initialValues = {
    // 返回一个对象 formik
    username: "",
    content: "",
    subject: "java",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const schema = Yup.object({
    username: Yup.string()
      .max(15, "用户名的长度不能大于15")
      .required("请输入用户名"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />

        <Field as="textarea" name="content" />
        <Field as="select" name="subject" >
          <option value="java">java</option>
          <option value="js">js</option>
        </Field>
        <input type="submit" />
      </Form>
    </Formik>
  );
}

export default App7;

```


2.2.6 使用useField 构建自定义表单控件
```jsx
function MyInputField ({ label, ...props }) {
  const [field, meta] = useField(props)
  return <div>
    <label htmlFor={props.id}>{label}</label>
    <input {...field} {...props} />
    <span>{ meta.touched && meta.error ? meta.error: null }</span>
  </div>
}

<MyInputField id='myPass' label='密码' type='password' name='password' placeholder="请输入密码"/>

```

``` jsx
import React from "react";
import {useField, Formik, Form, Field, ErrorMessage } from "formik"; // 增强表单

import * as Yup from "yup";


// 自定义表单控件
// 工作中需要完善这个表单的样式
function MyInputField ({ label, ...props }) {
  const [field, meta] = useField(props)
  // field 组件内部信息, 接受字段名称字符串或对象作为参数。
  // meta 验证相关
  return <div>
    <label htmlFor={props.id}>{label}</label>
    <input {...field} {...props} />
    <span>{ meta.touched && meta.error ? meta.error: null }</span>
  </div>
}


// 构建其他表单
function App8() {
  const initialValues = {
    // 返回一个对象 formik
    username: "",
    content: "",
    subject: "java",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const schema = Yup.object({
    username: Yup.string()
      .max(15, "用户名的长度不能大于15")
      .required("请输入用户名"),

      password: Yup.string()
      .min(6, "密码的长度不能小于6")
      .required("请输入密码"),

  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />

        <MyInputField id='myPass' label='密码' type='password' name='password' placeholder="请输入密码"/>
       
        <input type="submit" />
      </Form>
    </Formik>
  );
}

export default App8;

```


2.2.7 构建自定义复选框组件

``` jsx
function Checkbox ({ label, ...props }) {
  const [field, meta, helper] = useField(props)
  const {value} = meta
  const { setValue } = helper
  const handleChange = () => {
    const set = new Set(value)
    if (set.has(props.value)) {
      set.delete(props.value)
    } else {
      set.add(props.value)
    }
    setValue([...set])
  }
  return <div>
    <label htmlFor={props.id}>
      <input checked={value.includes(props.value)} type="checkbox" {...props} onChange={handleChange} />{label}
    </label>
  </div>
}

<Checkbox value="足球" label="足球" name="hobbies" />
<Checkbox value="篮球" label="篮球" name="hobbies" />
<Checkbox value="橄榄球" label="橄榄球" name="hobbies" />

const initialValues = {
  hobbies: ['足球', '篮球']
}
```

```jsx
import React from "react";
import {useField, Formik, Form, Field, ErrorMessage } from "formik"; // 增强表单

import * as Yup from "yup";


// 自定义表单控件

function Checkbox ({ label, ...props }) {
  const [field, meta, helper] = useField(props)
  const {value} = meta
  const { setValue } = helper
  const handleChange = () => {
    const set = new Set(value)
    if (set.has(props.value)) {// 反选 取消
      set.delete(props.value)
    } else {// 正选 加入
      set.add(props.value)
    }

    // 解构,包装成数组类型
    setValue([...set])
  }
  return <div>
    <label htmlFor={props.id}>
      <input checked={value.includes(props.value)} type="checkbox" {...props} onChange={handleChange} />{label}
    </label>
  </div>
}


// 构建其他表单--复选框类
function App9() {
  const initialValues = {
    // 返回一个对象 formik
    username: "",
    hobbies:["足球","橄榄球"]
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const schema = Yup.object({
    username: Yup.string()
      .max(15, "用户名的长度不能大于15")
      .required("请输入用户名"),

    

  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />

        <Checkbox value="足球" label="足球" name="hobbies" />
        <Checkbox value="篮球" label="篮球" name="hobbies" />
        <Checkbox value="橄榄球" label="橄榄球" name="hobbies" />
        
        
        <input type="submit" />
      </Form>
    </Formik>
  );
}

export default App9;

```
