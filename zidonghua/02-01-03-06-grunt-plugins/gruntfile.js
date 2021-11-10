const sass = require("sass");
const loadGruntTasks = require("load-grunt-tasks");

module.exports = (grunt) => {
  grunt.initConfig({
    // yarn grunt sass
    sass: {
      options: {
        sourceMap: true,
        implementation: sass,
      },
      main: {
        files: {
          "dist/css/main.css": "src/scss/main.scss",
        },
      },
    },
    // yarn grunt babel
    babel: {
      options: {
        sourceMap: true,
        // presets : presets 需要转换为那些预设 特性
        presets: ["@babel/preset-env"],
      },
      main: {
        files: {
          "dist/js/app.js": "src/js/app.js",
        },
      },
    },
    // yarn grunt watch
    watch: {
      js: {
        files: ["src/js/*.js"], // 监听那些文件
        tasks: ["babel"], // 监听时候执行的任务
      },
      css: {
        files: ["src/scss/*.scss"],
        tasks: ["sass"],
      },
    },
  });

  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt); // 自动加载所有的 grunt 插件中的任务

  // 一次执行多个任务
  // yarn grunt
  grunt.registerTask("default", ["sass", "babel", "watch"]);
};
