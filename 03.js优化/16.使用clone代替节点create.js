// clone 复制节点

// create 节点创建

// 获取p元素
const pEl = document.getElementsByTagName('p')[0]

let frag = document.createDocumentFragment()
for (let i = 0; i < 1000; i++) {
    const el = pEl.cloneNode(false)// 浅克隆, 不拷贝事件, 拷贝页面的这个p元素
    el.innerHTML = i
    frag.appendChild(el)
}
document.body.appendChild(frag)
