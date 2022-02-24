import './App.css';
import React from 'react';
import Tick from '../src/pages/tick';
import  Toggle from '../src/pages/toggle';

function App() { // 这是一个函数组件, 又叫做无状态组件, 在这个里面不能使用setSate
    let name = 'tina';
    let age = 18
    function addAge() {
        age = age + 1;
        console.log(age)
    }
    function changeName() {
        name = 'tt';
    }
    function ComponentTest(props) { // 这个算是函数组件吗
        // props: 传入的所有参数的集合, 且是只读属性, 不可更改
        return <h5>子组件的名字是{props.name}</h5>
    }
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    reactDom.render(dom元素, 这些dom期望注入到哪个div中)
                </p>
                <Tick />
                <button onClick={addAge}>add age</button>
                <h5>我的名字是{name}</h5>
                <h5>age: {age}</h5>
                <div className={'component-test-container'}>
                    下面是父容器测试组件的复用:
                    <ComponentTest name="first"></ComponentTest>
                    <ComponentTest name="second"></ComponentTest>
                </div>
            </header>
        </div>
    );
}

export default App;
