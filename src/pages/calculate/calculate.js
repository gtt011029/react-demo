import React from "react";
import TemperatureInput from "./temperature-input";

class Calculate extends React.Component { // 这个demo的目的就是学习如何提升state， 但是我也是不知道提升这个state有什么用
    constructor(props) {
        super(props);
        this.state = {
            temperature: '',  // 温度
            scale: 'c'   // 刻度
        }
    }

    tryConvert = (temperature, target) => {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        if (target === 'toCelsius') {
            return (input - 32) * 5 / 9;
        }
        if (target === 'toFahrenheit') {
            return (input * 9 / 5) + 32;
        }
    }

    // 温度改变的事件
    onTemperatureChange = (temperature, scale) => {
        this.setState({
            temperature: temperature,
            scale: scale
        })
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.state.scale;
        const celsius = scale === 'f' ? this.tryConvert(temperature, 'toCelsius') : temperature;
        const fahrenheit = scale === 'f' ? temperature : this.tryConvert(temperature, 'toFahrenheit')
        return (
            <div>
                // 摄氏度
                <TemperatureInput
                    scale={'c'}
                    temperature = {celsius}
                    onTemperatureChange={this.onTemperatureChange}
                />
                // 华式温度
                <TemperatureInput
                    scale={'f'}
                    temperature = {fahrenheit}
                    onTemperatureChange={this.onTemperatureChange}
                />

            </div>
        )
    }
}

export default Calculate