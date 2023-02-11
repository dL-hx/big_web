console.log('deep clone');

/**
 * 深拷贝
 */

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

obj2.arr[0] = 1

// 修改后查看原来的数据, 是否发生变化
console.log(obj1.address.city);
console.log(obj1.arr[0]);
 
console.log(obj2);

function deepClone(obj = {}) {
         if (typeof obj !=='object' || obj == null) {
             return obj
         }

         // 初始化返回结果
         let result 
         if (obj instanceof Array) {
            result = []
         }else{
             result = {}
         }

         for (const key in obj) {
             if (Object.hasOwnProperty.call(obj, key)) {
            //   if (obj.hasOwnProperty(key)) {
                 const value = obj[key];
                 result[key] = deepClone(value)
             }
         }

         return result
          
}
