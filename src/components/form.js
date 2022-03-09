import React from "react";
class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    // 在键盘输入时触发， 这边也可以根据业务需求， 更改值
    changeValueHandle = (event) => {
        if (event.target.value === 'tina') {
            this.setState({
                name: 'this is my name: tina'
            })
            return
        }
        this.setState({
            name: event.target.value
        })
    }

    getName = () => {
        console.log(this.state.name);
    }

    render() {
        return (
            <div>
                <form action="">
                    <label>name: </label>
                    <input type="text" value={this.state.name} onChange={this.changeValueHandle}/>
                </form>
                <button onClick={this.getName}>获取当前数据的name</button>
            </div>
        )
    }

}

export default Form