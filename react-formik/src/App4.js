import React from 'react';
import {useFormik} from 'formik';// 增强表单
import * as Yup from 'yup';



// 使用Yup schema增强表单验证规则

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
