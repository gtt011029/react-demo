import React from 'react';
import Ul from "../components/ul";

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            liList: [1, 2, 3, 4, 5]
        };

        // 这个地方的绑定是必要的, 这样才知道, 函数中的this, 表示的是这边的this
        // 当前,使用箭头函数也可以, 改变了this指向,
        // this代表的就是上下文环境
        this.handleClick = this.handleClick.bind(this);
        this.status = 'pending';
        this._status = 'pending'
    }

    get status() {
        console.log('获取status的值');
        return this._status
    }

    set status(value) {
        console.log('设置status')
        this._status = value
    }

    handleClick() { // 记住, 事件的命名为小驼峰命名法
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
        Promise.resolve('1111').then((resp) => {
            console.log(resp);
        })
    }

    promiseTest = () => {
        const aa = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('这边是.then的onFulfilled函数的参数')
            }, 2000)
        })

        aa.then((resp) => {
            console.log(resp)
        })
    }

    changeStatus = () => {
        this.status = this.status + '|22';
    }



    handleClickEvent = (e) => {
        console.log(e)
    }

    addLi = () => {
        // 原来是可以更新的, 但是怎么基于旧的state更新呢,
        // 这样就基于旧的state进行更新了, 之前写的有问题
        // this.setState({
        //     liList: [11, 23, 4, 5, 33, 1]
        // })
        this.setState((prevState, props) => {
            const newList = prevState.liList.concat(prevState.liList.length + 1)
            return ({
                liList: newList
            })
        })
    }

    render() {
        this.promiseTest();
        return (
            <div>
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
                <button onClick={(e) => this.handleClickEvent(e)}>
                    这边的事件是带有参数的
                </button>
                <button onClick={this.changeStatus}>更改status</button>
                <button onClick={this.addLi}>增加li</button>
                <Ul liList={this.state.liList}></Ul>
            </div>
        );
    }
}

export default Toggle;