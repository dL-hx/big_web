/* 
<ul>
    <li>ES6新特性</li>
    <li>前端工程化</li>
    <li>Vue源码分析</li>
</ul> 
*/

// document.querySelectorAll('li').forEach(item=>{
//     item.onclick=function () {
//         console.log(111);
//     }
// })

// 通过事件委托, 完成避免循环为元素添加事件
document.querySelector('ul').onclick = function (event) {
    let ev = event || window.event
    let tar = ev.target || ev.srcElement
    if (tar.nodeName.toLowerCase() === 'li') {
        console.log(222);
    }
}