import React from "react";

class MultiHole extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>我是父组件</div>
                <div>
                    <span>这是1号hole</span>
                    {this.props.first}
                </div>
                <div>
                    <span>这是2号hole</span>
                    {this.props.second}
                </div>
            </div>
        )
    }
}

export default MultiHole