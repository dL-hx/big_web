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
