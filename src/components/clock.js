import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        // 这边解释一下, prop和state的区别
        // props是父组件传递过来的参数
        // state是本组件自己的变量, 就压根不是同一个东西
        super(props);
        this.state = {
            title: '这是clock组件的title',
            date: new Date(),
            counter: 0,
        }
    }
    // 生命周期
    componentDidMount() {
        console.log('clock组件已经渲染成功: componentDidMount')
    }
    componentWillMount() {
        console.log('clock组件将要渲染: componentWillMount')
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('组件已经更新componentDidUpdate')
    }

    changeTitle = ()=> {  // 注意这边要使用函数表达式的方法定义函数, 使用箭头函数使得函数中this与外部保持一致
        // setstate会将改变排到队列中, 并告知react这个组件及其子组件需要用更行后的state进行重新渲染
        // 不要直接更改state的值, 那样的话, react不知道数据已经被更改就不会重新渲染
        // state, props的更新是非同步的, react会将setState进行批量处理(ps: 但是什么时候进行批量处理呢? 请你回答)
        // 所以不能依赖state或者props的值来更新state的值
        // 但是呢, 我们平常会有上述的需求, 这个时候就可以使用箭头函数(ps: 箭头函数为什么可以处理上述的问题呢)
        // 回答:
        this.setState({
            title: '这个更改后的'
        })
    }
    // addCounter = () => {
    //     this.setState((state, props) => ({
    //         counter: state.counter + props.increment
    //     }))
    // }

    addCounter() {
        this.setState((state, props) => ({
            counter: state.counter + props.increment
        }))
    }

    render() {
        return (
            <div>
                <h5>{this.state.title}</h5>
                <button onClick={this.changeTitle}>change title</button>
                <h6>It is {this.state.date.toLocaleTimeString()}.</h6>
                <button onClick={this.addCounter}>计数+1</button>
                <h6>当前的计数: {this.state.counter}</h6>
            </div>
        );
    }
}

export default Clock;