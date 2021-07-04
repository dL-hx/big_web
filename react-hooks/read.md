## React Hooks
对函数型组件进行增强

### 一 hooks介绍
### 1.1 hooks用来做什么
+ 1. 对函数式组件进行增强,  让函数式组件可以存储状态
+ 2. 可以处理[副作用]能力
+ 3. 让开发者在不使用类组件的情况下, 实现相同的功能

+ 数据获取、数据订阅,修改 DOM,定时器 副作用
+ 
+ class生命周期
+ func hooks 处理

### 1.2 类组件的不足(Hooks要解决的问题)
+ 1.缺少逻辑复用机制
为了复用逻辑增加无实际渲染效果的组件, 增加了组件层级, 显得十分臃肿

增加了调试的难度,运行效率降低

+ 2.类组件经常会变得很复杂难以维护
将一组相干的业务逻辑拆分到了多个生命周期函数中

在一个生命周期函数内, 存在多个不相干的业务逻辑

+ 3.类成员方法不能保证this指向的正确性

### 二 useState钩子函数

### 2.1  React Hooks
Hooks意为钩子, React Hooks就是一堆钩子函数, 通过这些钩子函数对函数组件进行增强,不同钩子有不同的功能

useState()
useEffects()
useReducer()
useRef()
useCallback()
useContext()
useMemo()

+ 2.1 useState()
用于为函数引入状态





React 之 专题（React Hooks）
1、React Hooks 介绍
1.1 React Hooks 是用来做什么的
对函数型组件进行增强, 让函数型组件可以存储状态, 可以拥有处理副作用的能力.

让开发者在不使用类组件的情况下, 实现相同的功能.

1.2 类组件的不足 (Hooks 要解决的问题)
缺少逻辑复用机制
为了复用逻辑增加无实际渲染效果的组件，增加了组件层级 代码显示十分臃肿
增加了调试的难度以及运行效率的降低
类组件经常会变得很复杂难以维护
将一组相干的业务逻辑拆分到了多个生命周期函数中 （与Vue2.0相似，Vue3.0就增加了Composition API （组合式 API）来解决此问题）
在一个生命周期函数内存在多个不相干的业务逻辑
类成员方法不能保证this指向的正确性
经常要使用 bing 或者 嵌套函数来保证，使得代码看起来复杂；
2、 React Hooks 使用
Hooks 意为钩子, React Hooks 就是一堆钩子函数, React 通过这些钩子函数对函数型组件进行增强, 不同的钩子函数提供了不同的功能.

``` jsx
useState()
useEffects()
useReducer()
useRef()
useCallback()
useContext()
useMemo()

```

2.1 useState()

用于为函数组件引入状态

``` jsx
import React, { useState } from 'react';

function App () {
	const [count, setCount ] = useState(0);
	return <div>
		<span>{count}</span>
		<button onClick={() => setCount(count + 1)}> +1 </button>
	</div>;
}

```

使用说明：

接收唯一的参数即状态初始值. 初始值可以是任意数据类型.
返回值为数组. 数组中存储状态值和更改状态值的方法. 方法名称约定以set开头, 后面加上状态名称.
方法可以被调用多次. 用以保存不同状态值.
参数可以是一个函数, 函数返回什么, 初始状态就是什么, 函数只会被调用一次, 用在初始值是动态值的情况.
设置状态值方法的参数可以是一个值也可以是一个函数.
设置状态值方法的方法本身是异步的.

``` jsx
import React, { useState } from 'react';

function App () {
  const [ count, setCount] = useState (0)
  const [ person, setPerson] = useState ({ name: "张三", age: 20})
	function handlecount() {
	  setCount (count => {
	  	return count + 1
	  })
	}
	document.title= count
  return  <div>
	<span>{count} {person.name} {person.age}</span>   
	<button onClick={handlecount}>+ 1</button>
	<button onclick={ () => setPerson({...person, name:"李四"}) }> setperson </button>
  </div>
}
```


2.2 useReducer()
useReducer是另一种让函数组件保存状态的方式.

``` jsx
import React, { useReducer } from  'react';


function App () {
    function reducer  (state, action) (
	  switch (action.type) {
	    case 'increment':
		  return state + 1
	  }
	}
	const [ count, dispatch ] = useReducer(reducer, 0)
	return  <div>
		<span>{ count }</span>
		<button onClick={ () => dispatch({ type: 'increment' })}> +1</button>
	</div>
}
```


2.3 useContext()
在跨组件层级获取数据时简化获取数据的代码.

``` jsx
import { createContext, useContext } from 'react';
const countcontext = createContext();
function App() {
  return (
    <countcontext.Provider value={100}>
      <Toolbar />
    </countcontext.Provider>
  );
}

function Toolbar() {
  const value = useContext(countcontext);  
  return <div>{value}</div>;
}
```


2.4 useEffect()
让函数型组件拥有处理副作用的能力. 类似生命周期函数.

useEffect 执行时机
可以把 useEffect 看做 componentDidMount, componentDidUpdate 和 componentWillUnmount 这三个函数的组合. 有三种情况

``` jsx
useEffect(() => {}) => componentDidMount, componentDidUpdate 组件挂载完成执行一次 组件数据更新完成之后执行
useEffect(() => {}, []) => componentDidMount 组件挂载完成执行一次
useEffect(() => () => {}) => componentWillUnMount 组件被卸载之前执行
```

useEffect 使用方法
为window对象添加滚动事件，组件卸载时移除
设置定时器让count数值每隔一秒增加1 ，组件卸载时清除定时器

useEffect 解决的问题
按照用途将代码进行分类 (将一组相干的业务逻辑归置到了同一个副作用函数中)
简化重复代码, 使组件内部代码更加清晰

``` jsx
import { useEffect } from "react";
import ReactDOM from 'react-dom';

function Api (props) {  

  function scroller() {
    console.log('滚动了')
  }
  useEffect(() => {
    window.addEventListener('scroll', scroller)
    return () => {
      window.removeEventListener('scroll', scroller)
    }
  }, [])
  return <div>
    <button onClick={ () => ReactDOM.unmountComponentAtNode(document.getElementById('root')) }>卸载组件</button>
  </div>
}
```


只有指定数据发生变化时触发effect

``` jsx
useEffect(() => {
  document.title = count
}, [count])
```


useEffect 结合异步函数
useEffect中的参数函数不能是异步函数, 因为useEffect函数要返回清理资源的函数, 如果是异步函数就变成了返回Promise

``` jsx
useEffect(() => {
  (async () => {// 自执行
      await axios.get()
  })()
})
```


2.5 useMemo()
useMemo 的行为类似Vue中的计算属性, 可以监测某个值的变化, 根据变化值计算新值.

useMemo 会缓存计算结果. 如果监测值没有发生变化, 即使组件重新渲染, 也不会重新计算. 此行为可以有助于避免在每个渲染上进行昂贵的计算.

``` jsx
import { useMemo } from "react";

const result = useMemo(() => {
  return count *2
}, [count])
```


2.6 memo 方法 (性能优化)
性能优化, 如果本组件中的数据没有发生变化, 阻止组件更新. 类似类组件中的 PureComponent 和 shouldComponentUpdate

会返回一个新的组件

``` jsx
import { memo } from "react";

const Counter = memo(function Count(){
  return <div>123</div>
})

export default Counter;
```


2.7 useCallback() 方法 (性能优化)
性能优化, 缓存函数, 使组件重新渲染时得到相同的函数实例. 防止组件因为函数实例不同而重新渲染

``` jsx
import { memo, useCallback, useState } from "react";

function Api () {
  const [count, setCount] = useState(0);
  const resetCount = useCallback( () => setCount(0), [setCount])
  return <div>
    <div>{count}</div>
    <button onClick={ () => setCount(count+1) }> +1</button>
    <Test resetCount={resetCount}/>
  </div>
}

const Test = memo(function Test1(props){
  console.log('组件渲染了')
  return <div>
    Test
    <button onClick={ props.resetCount }> reset </button>
  </div>
})  
```


2.8 useRef()
获取DOM元素对象

``` jsx
import { useRef } from "react";
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </div>
  );
}
```


保存数据 (跨组件周期)
即使组件重新渲染, 保存的数据仍然还在. useFef保存的数据被更改不会触发组件重新渲染. 举例：可以用于清除定时器

``` jsx
function App() {
  let timer = useRef();
  useEffect(() => {
    timer.current = setInterval(() => {
      setCount(count + 1)
    },1000)
  })
  const stopCount = () => {
    clearInterval(timer.current)
  }
  return <div>{count}</div>
}
```



3. 自定义 Hook
  自定义 Hook 是标准的封装和共享逻辑的方式.
  自定义 Hook 是一个函数, 其名称以 use 开头.
  自定义 Hook 其实就是逻辑和内置 Hook 的组合.
  主要目的就为了实现，组件之间的数据共享

``` jsx
import { useState, useEffect } from 'react';
// 自定义Hook
function useFriendStatus() {  
  const [list, setList] = useState({});
  useEffect(() => {
    axios.get('http://xxx').then(res => setList(res.data))
  }, []);
  return [list, setList];
}
function App() {  
  const [list, setList] = useFriendStatus();
  return <div> {list} </div>
}
```





// form hooks

``` jsx
import React, { useState } from 'react';
const useForm=function () {
    const [value, setValue]
    return {
        value:value,
        onChange:e=>setValue(e.target.value)
    }
}
function App() {  
    const personform= useForm()
    const pwdform= useForm()
    function submit(e) {
        e.preventDefault()
        console.log(personform.value);
        console.log(pwdform.value);
    }
    return <form onFinish={submit}>
        <input name='person' type='text' {...personform}/>
        <input name='pwd' type='password' {...pwdform}/>
        <button type='submit'>submit</button>
    </form>
  }
```



React 路由 Hooks
react-router-dom 路由提供的钩子函数

``` jsx
import { 
  useHistory, 
  useLocation,
  useRourteMatch,
  useParams
} from 'react-router-dom'
// 获取对应的路由对象
```



​		

5.useState 钩子函数简单实现

``` jsx
import React from 'react';
import ReactDOM from 'react-dom';

let state = [];
let setters = [];
let stateIndex = 0;

function createSetter (index) {
  return function (newState) {
    state[index] = newState;
    render ();
  }
}

function useState (initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState;
  setters.push(createSetter(stateIndex));
  let value = state[stateIndex];
  let setter = setters[stateIndex];
  stateIndex++;
  return [value, setter];
}

function render () {
  stateIndex = 0;
  effectIndex = 0;
  ReactDOM.render(<App />, document.getElementById('root'));
}
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Tom');
  return <div>
    {count}
    <button onClick={ () => setCount(count + 1) }>+1</button>
    <button onClick={ () => setName('JDAK')}>名字</button>
  </div>;
}
```


6.useEffect 钩子函数简单实现

``` jsx
function render () {
  effectIndex = 0;
  ReactDOM.render(<App />, document.getElementById('root'));
}


let prevDepsAry = [];
let effectIndex = 0;

function useEffect(callback, depsAry) {
  // 判断callback是不是函数
  if (Object.prototype.toString.call(callback) !== '[object Function]') throw new Error('useEffect函数的第一个参数必须是函数');
  // 判断depsAry有没有被传递
  if (typeof depsAry === 'undefined') {
    // 没有传递
    callback();
  } else {
    // 判断depsAry是不是数组
    if (Object.prototype.toString.call(depsAry) !== '[object Array]') throw new Error('useEffect函数的第二个参数必须是数组');
    // 获取上一次的状态值
    let prevDeps = prevDepsAry[effectIndex];
    // 将当前的依赖值和上一次的依赖值做对比 如果有变化 调用callback
    let hasChanged = prevDeps ? depsAry.every((dep, index) => dep === prevDeps[index]) === false : true;
    // 判断值是否有变化
    if (hasChanged) {
      callback();
    }
    // 同步依赖值
    prevDepsAry[effectIndex] = depsAry;
    effectIndex++;
  }
```



7. useReducer 钩子函数简单实现

  ``` jsx
  7. function useReducer (reducer, initialState) {
       const [state, setState] = useState(initialState);
       function dispatch (action) {
      const newState = reducer(state, action);
      setState(newState);
       }
       return [state, dispatch];
     }
  
  function App() {
    function reducer (state, action) {
      switch (action.type) {
        case 'increment':
          return state + 1;
        case 'decrement':
          return state - 1;
        default:
          return state;
      }
    }
    const [count, dispatch] = useReducer(reducer, 0);
    return <div>
      {count}
      <button onClick={() => dispatch({type: 'increment'})}>+1</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-1</button>
    </div>;
  }
  ```

  
