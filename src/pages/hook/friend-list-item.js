import React from "react";
import useCustomHook from "./custom-hook";

function FriendListItem(name) {
    const isOnline = useCustomHook(name)

    return (
        <div key={name}>
            <span>{name}: </span>
            <span>{isOnline ? '在线' : '不在线'}</span>
        </div>
    )
}

export default FriendListItem