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
