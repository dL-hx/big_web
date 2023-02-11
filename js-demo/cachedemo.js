// cachedemo

// 闭包隐藏数据, 只提供API
function createCache(){
    const data = {} // 闭包中的数据,被隐藏,不被外界访问
    return {
        set(key, value){
            data[key] = value
        },
        get(key){
            return data[key]
        }
    }
}


const c = createCache()
c.set('a', 100)

console.log(c.get('a'));
