// 组合， 有些component不会提前知道它的children是什么， 这边可以使用props把children element直接传进去

import React from "react";
class CompositionDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <h5>这是父元素</h5>
                // 就是插槽
                {this.props.children}
            </div>
        )
    }
}

export default CompositionDemo;