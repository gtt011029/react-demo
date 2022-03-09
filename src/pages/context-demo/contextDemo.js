import React from "react";
export const themes = {
    morning: {
        fontColor: 'black',
        background: 'light-grey',
    },
    night: {
        fontColor: 'white',
        background: 'blue',
    },
};

export const ThemeContext = React.createContext(
    themes.night
);