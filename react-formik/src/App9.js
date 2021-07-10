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
