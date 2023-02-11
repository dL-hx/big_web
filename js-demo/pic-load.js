// 图片加载
console.log('start');
let img = document.createElement('img')

img.onload = function () {
    console.log('loaded');
}

img.src = '/xxx.png'
console.log('end');
