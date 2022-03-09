import React from "react";
const scaleNames = {
    c: 'Celsius', // 摄氏度
    f: 'Fahrenheit' // 华式温度
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e, scale) => {
        this.props.onTemperatureChange(e.target.value, scale);
    }

    render() {
        const scale = this.props.scale;
        const temperature = this.props.temperature;
        return (
            <fieldset>
                <legend>输入温度  到{scaleNames[scale]}</legend>
                <input  value={temperature} onChange={($event) => this.handleChange($event, scale)} />
            </fieldset>
        )
    }

}

export default TemperatureInput