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
