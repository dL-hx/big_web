// Grunt 的入口文件

// 用于定义一些需要Grunt 自动执行的任务

// 需要导出一个函数

// 此函数接收一个grunt 的形参, 内部提供一些创建任务时候 可以用到的API

module.exports = (grunt) => {
  // 默认被执行的任务列表
  grunt.registerTask("foo", function () {
    console.log("hello grunt~");

    return false // 标记任务失败
  });

  grunt.registerTask("bar", "任务描述", function () {
    console.log("hello bar~");
  });

  // 默认执行default 配置的这两个任务
  // yarn grunt
  // 如果 foo 任务失败则不会向下执行
    grunt.registerTask("default",['foo', 'bar']);

  // 异步任务
  // yarn grunt async-task
  //   grunt.registerTask("async-task",function () {
  //    setTimeout(function () {
  //     console.log("async-task working~");
  //    },1000)
  //   });

  grunt.registerTask("async-task", function () {
    var done = this.async(); // 切换为异步模式

    setTimeout(function () {
      // 注意，传递 false 给 done() 函数就会告诉Grunt你的任务已经失败。
      console.log("async-task working~");
      done()
    }, 1000);
  });


  // 异步任务错误指定
  grunt.registerTask("bad-task", function () {
    var done = this.async(); // 切换为异步模式

    setTimeout(function () {
      // 注意，传递 false 给 done() 函数就会告诉Grunt你的任务已经失败。
      console.log("bad-task working~");
      done(false)
    }, 1000);
  });
};
