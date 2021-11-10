// 多目标任务
// https://www.gruntjs.net/creating-tasks
module.exports = (grunt) => {
  // 多目标模式, 可以让任务根据配置形成多个子任务
  grunt.initConfig({
    build: {
      options: {
        foo: "bar",
      },
      css: {
        options: {
          foo: "bar",
        },
      },

      js: 2,
    },
  });

  // 多目标模式, 可以让任务根据配置形成多个子任务
  // yarn grunt build 
  grunt.registerMultiTask("build", function () {
    console.log(this.options())// 读取option 的 value => // {foo: "bar"}
    console.log(this.target + ": " + this.data);
  });

  // grunt.initConfig({
  //   log: {
  //     foo: [1, 2, 3],
  //     bar: 'hello world',
  //     baz: false
  //   }
  // })

  // $ yarn grunt log 
  // grunt.registerMultiTask('log',  function() {
  //   console.log(this.target + ': ' + this.data);
  // });
};
