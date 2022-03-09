import React from "react";

class Focus extends React.Component {
    constructor(props) {
        super(props);
        // 创建一个textInput dom元素的ref, 那这边呢， 就可以拿到这个dom的所有数据啦
        this.textInput = React.createRef()
    }

    setFocus = () => {
        console.log(this.textInput)
        this.textInput.current.focus()
    }

    render() {
        return (
            <div>
                <button onClick={this.setFocus}>设置焦点</button>
                <br/>
                <input type="text" ref={this.textInput}/>
            </div>
        )
    }
}

export default Focus