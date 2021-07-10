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
