import React, {useState, useEffect} from "react";

// 需求： 在组件之间重用一些逻辑状态， 这边是被不同的组件复用了，但是和组件的复用有什么区别你呢， 看不出来
// 注意啊， 以use开头的函数，且调用其他的hook就可以说是一个自定义组件
function useCustomHook(friendName) {
    const [isOnline, setOnline] = useState(null);

    const handleStatusChange = (state) => {
        console.log(state)
        setOnline(state)
    }

    useEffect(() => {
        const nameList = ['Tina', 'Cindy', 'Ben']
        if (nameList.includes(friendName)) {
            // 这个里面不能加异步操作吗
            handleStatusChange(true)
        } else {
            handleStatusChange(false)
        }
        return () => {
            handleStatusChange(false);
        }
    })

    return isOnline
}

export default useCustomHook