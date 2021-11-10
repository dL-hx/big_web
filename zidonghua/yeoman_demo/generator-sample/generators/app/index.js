// 此文件作为Generator的核心入口
// 需要导出一个继承自 Yeoman Generator 的类型
// Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法

// 在这个方法中, 调用父类功能实现一些功能, 如: 文件写入

const Generator = require('yeoman-generator');
module.exports = class extends Generator{
    promiting(){
        // Yeoman 在询问用户环节会调用此方法

        // 在此方法中可以调用父类的 prompt() 方法发出对用户的命令行询问

        return this.prompt({
            type:'input',
            name:'name',
            message:'Your project name',
            default:this.appname // appname 为项目生成目录名称

        })
        .then(answers=>{
            // answers => {name: 'user input value'}
            this.answers = answers
        })
    }
    writing(){
        // yeoman 自动在生成文件阶段调用此方法

        // 我们这里尝试往生成目录下写入文件

        // this.fs.write(
        //     this.destinationPath('temp.text'), // 父级目录
        //     Math.random().toString()
        // )

        // 通过模板方式写入文件到目标文件

        // 模板文件路径
        // const templ = this.templatePath('foo.txt')

        // // 输出文件目标路径
        // const ouput =  this.destinationPath('foo.text')

        // // 模板数据上下文
        // const context = {title:'Hello zce~', success:true}

        // // 拷贝模板文件,  映射到输出文件上面
        // this.fs.copyTpl(templ,ouput,context)




        const templ = this.templatePath('bar.html')

        // 输出文件目标路径
        const ouput =  this.destinationPath('bar.html')

        // 模板数据上下文
        const context = this.answers

        // 拷贝模板文件,  映射到输出文件上面
        this.fs.copyTpl(templ,ouput,context)

    }
}