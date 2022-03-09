import './App.css';
import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Tick from '../src/pages/tick';
import  Toggle from '../src/pages/toggle';
import PromiseTest from "./pages/promiseTest";
import Form from "./components/form";
import QuickSort from "./components/quickSort";
import Calculate from "./pages/calculate/calculate";
import MultiHole from "./pages/composition/multiHole";
import CompositionDemo from "./pages/composition/composition";
import Focus from "./pages/focus/focus";
import HookDemo from "./pages/hook/hook";
import FriendStatus from "./pages/hook/friend -status";
import FriendList from "./pages/hook/friend-list";

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
            <FriendList />
            <FriendStatus />
            <HookDemo />
            <Focus />
            <CompositionDemo>
                {/* 原来是这样用的， 就是插槽（vue： slot; angular: #template）*/}
                <h6>这是插槽吗</h6>
            </CompositionDemo>
            {/* 就是以参数的形式， 传递element */}
            <MultiHole second={<span>我是二号， 我的代码写在上面， 但是理论上我应该渲染在下面</span>}
                       first={<span>我是一号， 我的代码写在下面， 但是理论上我应该渲染在上面</span>} />
            {/*            <header className="App-header">
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
            <div>
                <h5>我的多个li的渲染</h5>
                <Toggle></Toggle>
            </div>

            <div>
                <h5>我的promise test</h5>
                <PromiseTest />
            </div>
            <div>
                <h5>我的表单</h5>
                <Form />
            </div>
            <div>
                <QuickSort />
            </div>

            <Calculate />
        </header>*/}
        </div>
    );
}

export default App;
