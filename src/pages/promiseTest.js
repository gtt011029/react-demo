import React from 'react';

class PromiseTest extends React.Component {
    constructor(props) {
        super(props);

    }


    promiseTest = () => {
        console.log('promiseTest');
        const test = new MyPromise((resolve, reject) => {
            // this.aa(test);  // 这样的话， 这边就会报警告， 为什么promiseResolve就可以接收promise2为参数？？？？？？？？？？？？？？？？/
            setTimeout(() => {
                resolve('这是resolve给的数据')
            }, 0)
        })
        test.then((resp) => {
            console.log(resp);
            return new MyPromise((resolve2, reject2) => {
                setTimeout(() => {
                    resolve2('这是第二个promise')
                }, 1000)
            })
        }, (reason) => {
            console.log('reason: ', reason)
        }).then((resp) => {
            console.log(resp);
        })
    }

    funTest2 = (promise) => {
        console.log(promise)
    }

    funTest = () => { // 这个真的可以！！！！！
        const myClass = new PromiseTest()
        this.funTest2(myClass)
    }


    promiseDemo = () => {
        const aa = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('这是resolve');
                reject('这是reject');
            }, 500)
        })
        aa.then((resp) => {
            console.log('这是fulfilled的返回结果1： ', resp); // 这个时候就不需要再去写执行者函数， 因为必然是第一个.then执行完成后， 再去执行第二个， 但是这个地方如果想要去执行rejected呢？？
                                                            // 解答： 虽然返回的是一个promise， 但是返回的是一个promise实例， 里面的执行者函数， 可不是由自己写的， 所以这边不可以去执行rejected
            setTimeout(() => {
                return 'this is then 1 return'
            }, 1000)  // 这边的话， 后面的then就接收不到数据了， 看起来promise还是有缺陷的
            // return new Promise((resolve2, reject2) => { // 如果想在then中继续进行异步代码编程， 就还是得new一个promise
            //     setTimeout(() => {
            //         resolve2('this is second promise')
            //     }, 1000)
            // })
            // return 'this is second promise test'  // 必须是同步的吗？？？？？？？？？？？？？
        }, (reason) => {
            console.log('这是rejected的返回结果1： ', reason);
        }).then((resp2) => {
            console.log('这是fulfilled的返回结果2: ', resp2) // 22222, 所以不管是fulfilled返回还是rejected返回， 后面接收到数据的都是fulfilled
        }, (reason2) => {
            console.log('这是rejected的返回结果2： ', reason2);
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.promiseTest}>测试我的promise</button>
                <button onClick={this.promiseDemo}>promise</button>
                <button onClick={this.funTest}>测试类里面实例化该类</button>
            </div>
        )
    }
}

class MyPromise {
    constructor(fn) {
        this.value = undefined; // 执行resolve 函数的参数
        this.reason = undefined;  // 执行reject函数的参数

        this.onFulfilledList = []; // 暂时存储then里面的那个函数, 等到该执行的时候再去执行
        this.onRejectedList = [];

        this.state  = 'pending';  // pending, fulfilled, rejected
        this._state = 'pending';

        try {
            fn(this.resolve.bind(this), this.reject.bind(this)) //这个是new Promise传入的回调函数, new promise的时候就立即开始被执行了, 是同步执行的, then才是微任务
        } catch(e) {
            this.reject(e)
        }
    }

    get state() {
        return this._state
    }

    set state(value) { // 当state的值被更改, 这边就会被监听到, 所以就在这里判断现在要不要执行then里面的参数函数
        this._state = value
        if (value === 'fulfilled') {
            this.onFulfilledList.forEach((onFulfilled) => {
                onFulfilled(this.value)
            })
        }
        if (value === 'rejected') {
            this.onRejectedList.forEach((onRejected) => {
                onRejected(this.reason)
            })
        }
    }

    resolve = (value) => {
        if (this.state === 'pending') {
            this.value = value
            this.state = 'fulfilled'
        }
    }

    reject = (reason) => {
        if (this.state === 'pending') {
            this.reason = reason
            this.state = 'rejected'
        }
    }

    // 判断当前的参数是否为函数类型
    isFunction = (fun) => {
        if (typeof fun === 'function') {
            return true
        } else {
            return false
        }
    }

    // 其实这里还是有一些疑惑的
    resolvePromise = (promise2, x, resolve, reject) => {
        if (promise2 === x) {
            // 注意如果promise2 和 x 相等的话， 就会陷入死循环， 所以这里， 就直接报错就行
            return reject(new TypeError('the promise and then return value are the same'))
        }

        if (x instanceof MyPromise) {
            x.then((y) => {
                this.resolvePromise(promise2, y, resolve, reject) // 这边是递归吗
            }, reject)
            return
        }
        if (typeof x === 'object' || this.isFunction(x)) {  // 不明白, 明明不是 MyPromise类型的数据了, 为什么这边还需要去获取什么.then. 是在不明白这里管它干嘛??????
            if (x === null) {
                return resolve(x)
            }
            let then = null;
            try {
                then = x.then;
            } catch (e) {
                reject(e)
            }

            if ((this.isFunction(then))) {
                let called = false;
                try {
                    then.call(x, (y) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        this.resolvePromise(promise2, y, resolve, reject);
                    })
                } catch (error) {
                    if (called) {
                        return ;
                    }
                    called = true;
                    reject(error)
                }
            } else {
                resolve(x)
            }
            return
        }

        resolve(x) // 如果以上类型都不是的话， 直接resolve出来
    }

    then = (onFulfilled, onRejected) => { // 接收两个函数, 在该他们执行的时候再去执行, 但有时不是不会去传这两个callback吗, 这样的话就是undefined

        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : () => this.value;  // 这边如果不是函数的话, 个给个默认的简单函数
        const realOnRejected = this.isFunction(onRejected) ? onRejected : () => this.reason;

        const promise2 = new MyPromise((resolve, reject) => { // 类中的函数， 实例化这个类？？？？？？？？？？？

            const fulfilledMicrotask = () => {
                try{
                    const x = realOnFulfilled(this.value) // fulfilled的执行结果 比如then的地一个callback返回的数据
                    this.resolvePromise(promise2, x, resolve, reject)
                }catch (e) {
                    this.reject(e)
                }
            }

            const rejectedMicrotask = () => {
                try{
                    const x = realOnRejected(this.reason)
                    this.resolvePromise(promise2, x, resolve, reject)
                }catch (e) {
                    this.reject(e)
                }
            }

            switch (this.state) {
                case 'pending': {  // fn函数还没有执行完呢, 先存下来等着吧
                    this.onFulfilledList.push(fulfilledMicrotask);
                    this.onRejectedList.push(rejectedMicrotask);
                    break;
                }
                case 'fulfilled': {
                    fulfilledMicrotask()
                    break;
                }
                case 'rejected': {
                    rejectedMicrotask()
                    break;
                }
            }

        })

        console.log(promise2);

        return promise2  // 这边就是.then函数返回的新的promise， 虽然返回的是一个promise， 但是返回的是一个promise实例， 里面的执行者函数， 可不是由自己写的， 是之前的那个promise
    }

}

export default PromiseTest