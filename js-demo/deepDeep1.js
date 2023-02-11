const obj1 = {
    age:20,
    name:'xxx',
    address:{
        city:'beijing',
        x:{
            y:{
                z:100
            }
        }
    },
    arr:['a', 'b', 'c']
}

const obj2 = deepClone(obj1)


obj2.address.city = 'shanghai'

 
console.log(obj2);

function deepClone(obj ={}) {
    if (typeof obj ==null || typeof obj!=='object') {
        return obj
    }

    let result

    if (obj instanceof Array) {
        result = []
    }else{
        result = {}
    }

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            result[key] = value
        }
    }

    return result
    
}
