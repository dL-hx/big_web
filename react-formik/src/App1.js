import React from 'react';
import {useFormik} from 'formik';// 增强表单


function App1() {
  const formik = useFormik({initialValues: {// 返回一个对象 formik
    username: '张三',
    password:'123456'
  }, onSubmit: values => {// 在这里获取表单所有输入的值
    console.log(values);
  }});

  return (
    <form onSubmit={formik.handleSubmit} >
      <input name='username' type='text'     value={formik.values.username} onChange={formik.handleChange}/>
      <input name='password' type='password' value={formik.values.password} onChange={formik.handleChange}/>
      <input type='submit'/>
    </form>
  );
}

export default App1;
