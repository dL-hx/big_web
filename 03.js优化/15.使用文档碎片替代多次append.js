/* for (let i = 0; i < 1000; i++) {
    const el = document.createElement('p')  
    el.innerHTML = 'lg is a coder'
    document.body.appendChild(el)
} */

// 先提前定义一个变量容器,  在内存中将dom拼接好后, 最后只用操作一次dom
let frg = document.createDocumentFragment()
for (let i = 0; i < 1000; i++) {
    const el = document.createElement('p')  
    el.innerHTML = 'lg is a coder'
    frg.appendChild(el)
}

document.body.appendChild(frg)
