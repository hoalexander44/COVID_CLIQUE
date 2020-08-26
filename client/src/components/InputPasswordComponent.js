import React, { Component } from 'react';


class InputPasswordComponent extends Component {
    render() {
        return (
            <div>
                <label className="nonInputText" htmlFor="textInput">{this.props.label}</label>
                <input
                    className = "textInput"
                    type="password"
                    name="textInput"
                    onChange={this.props.logChange}
                    defaultValue={this.props.defaultText}>
                </input>
            </div>
        );
    }
}

export default InputPasswordComponent;
