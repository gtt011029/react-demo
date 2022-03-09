import React, { useState, useEffect } from "react";
// 这边就是可以让你在不编写class的情况下， 也可以使用state， 以及react的其他特性

// 可以使得不用修改组建的情况下复用状态逻辑 ？？？ 举个栗子？

// 什么是Hook： 就是可以让你在函数组件里“钩入”react state及生命周期等特性的函数

// 例如 useEffect = componentDidMount + componentDidUpdate + componentWillUnmout
// 且可以多次调用

// hook的使用规则：
// 1。 只能在函数最外层调用hook， 不能在循环， 函数判断， 子函数中调用
// 2. 只能在react的函数组件中使用， 或者自定义hook中


function HookDemo() {
    // useState就是一个Hook（钩子）
    // 所以从这里就可以看出， useState会返回一个数， 和更改这个数的函数
    const [count, setCount] = useState(0)
    const  addCount = () => {
        setCount(count + 1) //这边的改变可以导致页面的重新渲染
    }
    // 完成dom的更改后， 就会运行副作用函数
    useEffect(() => {
        // 使用浏览器的api
        console.log('这是我的第一次effect')
        document.title = `you click ${count} times`;
        return () => {
            // 为什么每次都会执行？？？？？不合理
            console.log('这是副作用函数的return 函数');
            // 这边return的函数， 可以在里面写入“清除副作用”的相关代码， 比如说， 在副作用函数中订阅了什么东西，
            // 那这边就可以写取消订阅的相关代码
        }
    })
    const [name, setName] = useState('tina')
    useEffect(() => {
        console.log('这是我的第二次effect')
        return () => {
            console.log('这是我的第二个effect return')
        }
    })
    return (
        <div>
            <h4>这是我的hook demo</h4>
            <button onClick={addCount}>增加count</button>
            <span>{count}</span>
        </div>
    )
}

export default HookDemo