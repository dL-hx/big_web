function loadImg(src) {
    const p = new Promise((resolve, reject)=>{
        const img = document.createElement('img')
        
        img.onload = ()=>{
            resolve(img)
        }
        
        img.onerror=()=>{
            const err  = new Error(`图片加载失败 ${src}`);
            reject(err)
        }

        img.src = src
    });
    return p
}

const url1 = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
const url2= 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'

// loadImg(url1).then(img=>{
//     console.log(img.width);
    
//     return img
// }).then(img=>{
//     console.log(img.height);
    
// }).catch(ex=>console.error(ex))
loadImg(url1).then(img=>{
    console.log(img.width);
    
    return img// 普通对象
}).then(img=>{
    console.log(img.height);
    return loadImg(url2)// promise实例
}).then(img2=>{
    console.log(img2.width);
    return img2
}).then(img2=>{
    console.log(img2.height);
})

