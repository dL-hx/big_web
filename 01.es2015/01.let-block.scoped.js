/* if (true) {// var 声明的变量,块级作用域提升
  // var foo = 'zce'
  let foo = "zec";
  console.log(foo);
} */
//--------
// 内层循环变量块级作用域提升,  循环避免使用相同的循环变量
// for (var i = 0; i < 3; i++) {
//     for (var i = 0; i < 3; i++) {
//         console.log(i)
//     }
//     console.log('内层结束 i=' + i)
// }



// -------------------------------
// for (let i = 0; i < 3; i++) {
//     for (let i = 0; i < 3; i++) {
//         console.log(i)
//     }
//     console.log('内层结束 i=' + i)
// }

//-----------------
// var elements  = [{},{},{}]
// for (var i = 0; i < elements.length; i++) {
//     elements[i].onclick = function () {
//         console.log(i)
//     }
// }

// elements[2].onclick()

// var elements  = [{},{},{}]
// for (var i = 0; i < elements.length; i++) {
//     elements[i].onclick = (function (j) {
//        return   function () {
//         console.log(j)
//        }
//     })(i)
// }

// elements[2].onclick()


/* var elements  = [{},{},{}]
for (let i = 0; i < elements.length; i++) {
    elements[i].onclick = function () {
        console.log(i)
    }
}
elements[2].onclick() */

// for (let i = 0; i < 3; i++) {
//     let i = 'foo'
//     console.log(i)
// }

/* let i = 0
if (i<3) {
        let i = "foo";
        console.log(i);
}
i++

if (i<3) {
        let i = "foo";
        console.log(i);
}
i++

if (i<3) {
    let i = "foo";
    console.log(i);
}
i++ */

// 块级作用域提升
// console.log(foo)// undefined
// var foo = 'zce'


console.log(foo)//引用异常
let foo = 'zce'