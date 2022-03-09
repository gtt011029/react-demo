import React from "react";
import useCustomHook from "./custom-hook";

function FriendStatus() {
    const isOnline = useCustomHook('Tina')
    return (
        <div>
            <span>Tina: </span>
            <span>{isOnline ? '在线' : '不在线'}</span>
        </div>
    )
}

export default FriendStatus