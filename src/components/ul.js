import React from 'react';

class Ul extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('ul componentDidUpdate')
        console.log('prevProps: ', prevProps)
    }

    showList = () => {
        console.log(this.props);
        return this.props.liList.map((li, index) => {
            // 这边必须加一个l可以, 用于帮助react分辨哪些项目被更改, 增加, 或删除
            // 但是如果key没有改变, 但是里面的内容变了呢
            // 注意： key是只增加在有array的地方
            return <li key={index}>{li}</li>
        })
    }
    render() {
        const liList = this.props.liList;
        // 这样的写法也是可以的, 并且可以在props的值更改后， 重新渲染
        return (
            <ul>{
                liList.map((li, index) =>
                    <li key={index}>{li}</li>
                )
                }</ul>
        )
    }
}

export default Ul