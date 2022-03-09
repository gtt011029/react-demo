import React from "react";
import FriendListItem from "./friend-list-item";
// Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
// 因为是把element() 写成了element

function FriendList() {
    function element() {
        const nameList = ['Tina', 'Cindy', 'Rita', 'Ben']
        return nameList.map((name) => {
            return FriendListItem(name)
        })
    }
    return (
        <div>
            {element()}
        </div>
    )
}

export default FriendList