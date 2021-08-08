const PENDING = "pending"; //等待
const FULFILLED = "fulfilled"; // 成功
const REJECTED = "rejected"; // 失败

// 定义一个类
// 传递构造函数
class MyPromise {
  constructor(executor) {
    try {
     executor(this.resolve, this.reject);
      
    } catch (error) {
      this.reject(error)
    }
  }

  // promise 状态
  status = PENDING;
  // 成功后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;

  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];

  resolve = (value) => {
    // 阻止状态更改
    // 如果状态不是等待, 阻止程序向下执行
    if (this.status != PENDING) return;
    // 将状态改为成功
    this.status = FULFILLED;

    // 保存成功后的值
    this.value = value;

    // 判断成功回调是否存在, 如果存在就调用

    // this.successCallback && this.successCallback(this.value);

    // 循环数组 , 在循环的过程中调用回调函数
    // if 长度 不为 0
    while (this.successCallback.length)
      // this.successCallback.shift()(this.value);
      this.successCallback.shift()();
  };

  reject = (reason) => {
    // 如果状态不是等待, 阻止程序向下执行
    if (this.status != PENDING) return;
    // 将状态改为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;

    // 判断失败回调是否存在, 如果存在就调用

    // this.failCallback && this.failCallback(this.reason);

    // while (this.failCallback.length) this.failCallback.shift()(this.reason);
    while (this.failCallback.length) this.failCallback.shift()();
  };

  then(successCallback, failCallback) {
    // 增加默认参数， 使得then方法为可选参数
    successCallback = successCallback?successCallback: value=>value
    failCallback = failCallback?failCallback: reason=>{ throw reason }
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(()=>{// promise2执行完成后,才会有这个promise2生成// 使用setTimeout 将函数编程异步代码, 这样函数会在所有同步代码完成后执行
          try {
              // 拿到成功返回值
              let x = successCallback(this.value);
              // resolve(x);
              // 判断x的值是普通值还是promise对象
              // 如果是普通值, 直接调用resolve

              // 如果是Promise对象, 查看promise对象返回的结果

              // 再根据Promise对象返回的status 结果, 决定调用resolve还是reject
              resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        },0)
      } else if (this.status === REJECTED) {
        // failCallback(this.reason);

        setTimeout(()=>{// promise2执行完成后,才会有这个promise2生成// 使用setTimeout 将函数编程异步代码, 这样函数会在所有同步代码完成后执行
          try {
              // 拿到失败返回值
              let x = failCallback(this.reason);;
              // resolve(x);
              // 判断x的值是普通值还是promise对象
              // 如果是普通值, 直接调用resolve

              // 如果是Promise对象, 查看promise对象返回的结果

              // 再根据Promise对象返回的status 结果, 决定调用resolve还是reject
              resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        },0)
      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(()=>{
          // successCallback()
          setTimeout(()=>{// promise2执行完成后,才会有这个promise2生成// 使用setTimeout 将函数编程异步代码, 这样函数会在所有同步代码完成后执行
            try {
                // 拿到成功返回值
                let x = successCallback(this.value);
                // resolve(x);
                // 判断x的值是普通值还是promise对象
                // 如果是普通值, 直接调用resolve
  
                // 如果是Promise对象, 查看promise对象返回的结果
  
                // 再根据Promise对象返回的status 结果, 决定调用resolve还是reject
                resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          },0)
        });
        this.failCallback.push(()=>{
          // failCallback()
          setTimeout(()=>{// promise2执行完成后,才会有这个promise2生成// 使用setTimeout 将函数编程异步代码, 这样函数会在所有同步代码完成后执行
            try {
                // 拿到失败返回值
                let x = failCallback(this.reason);;
                // resolve(x);
                // 判断x的值是普通值还是promise对象
                // 如果是普通值, 直接调用resolve
  
                // 如果是Promise对象, 查看promise对象返回的结果
  
                // 再根据Promise对象返回的status 结果, 决定调用resolve还是reject
                resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          },0)
        });
      }
    });

    return promise2;
  }

  finally(callback){
    return this.then((value)=>{
     return MyPromise.resolve(callback()).then(()=>value)
      // callback() // 成功回调
      // return value
    }, (reason)=>{
      // callback(reason)// 失败回调

     return MyPromise.resolve(callback()).then(()=>{throw reason} )

      // throw reason;
    })
  };

  catch(failCallback){
    return this.then(undefined, failCallback)
  }


  // 由类名调用的方法是静态方法
  static all(array){
    let result = []// 准备结果数组将值放到结果数组中

    let index = 0
 
    return new MyPromise((resolve, reject)=>{

      function addData(key, value) {
        result[key] = value
        index ++ 
        if (index===array.length) {
          resolve(result)
        }
      }
      
      for (let i = 0; i < array.length; i++) {
        const current = array[i]; //当前值
        // 当前值的类型
        if (current instanceof MyPromise) {
          // Promise 对象
          current.then((value)=>{  addData(i, value) }, (reason)=>{reject(reason)});
        } else {
          // 普通值
          addData(i, array[i])
        }
      }

    });
  }

  // promise resolve是一个静态方法
  static resolve(value){
    // 判断这个值是不是一个 Mypromise的实例对象
    if (value instanceof MyPromise) return value;

    return new MyPromise((resolve)=>resolve(value));
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    // return / 阻止程序向下执行
   return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  }

  if (x instanceof MyPromise) {
    // 如果x 是Promise的一个实例对象
    // promise 对象
    // x.then((value)=>{resolve(value)}, (reason)=>{reject(reason)})
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }

  
}
// CommonJS  //需要导出这个promise

module.exports = MyPromise;
