// innerHTML 不需要创建后加行为 使用字符串形式

// create() append()  可以方便后面为节点加事件


let arrList = []
for (let i = 0; i < 1000; i++) {
  arrList.push(`<p>${i}</p>`) 
}
// 创建字符串级别的

document.body.innerHTML = arrList.join('')