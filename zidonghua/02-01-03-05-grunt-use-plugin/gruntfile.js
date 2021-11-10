module.exports = grunt => {
  grunt.initConfig({// 配置任务命令 的 配置选项
    clean: {
      temp: 'temp/**',       // 清除目录下的所有文件
      // temp: 'temp/*.txt', // 清除目录下的所有  txt文件 , 通配符方式
      // temp: 'temp/*.js'
    }
  })

  // 用于项目创建过程产生的临时文件

  // yarn grunt clean // 清除 temp 文件目录下的临时文件
  grunt.loadNpmTasks('grunt-contrib-clean')
}