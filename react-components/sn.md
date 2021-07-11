## 受控组件与非受控组件的选用标准

### 非受控组件
表单数据交给DOM节点管理, 特点是表单数据[在需要时进行提取], 代码实现相对简单

```jsx
function App() {
    const userInput = useRef();
    function handleSubmit(e) {
        e&&e.preventDefault();
        const username = userInput.current.value;
    }
    return <form onSubmit={handleSubmit}>
        <input type='text' ref={userInput}/>
        <input type='submit'/>
    </form>
}

```

### 受控组件
表单数据交给state管理, 特点是表单数据[实时获取表单数据], 代码实现相对复杂

```jsx
class App extends Component{
    state={username:''}
    handleChange(event){
        this.setState({
            username:event.target.value
        });
    }
    render() {
        return (
            <form>
                <input type='text' value={this.state.username} onChange={this.handleChange.bind(this)}/>
                <span>{this.state.username}</span>
                <input type='submit'/>
            </form>
        );
    }
}

```

![选用标准](%E9%80%89%E7%94%A8%E6%A0%87%E5%87%86.png)
