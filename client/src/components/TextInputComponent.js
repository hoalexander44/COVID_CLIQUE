import React, { Component } from 'react';


class TextInputComponent extends Component {
    render() {
        return (
            <div>
                <label className="nonInputText" htmlFor="textInput">{this.props.label}</label>
                <input
                    className = "textInput"
                    type="text"
                    name="textInput"
                    onChange={this.props.logChange}
                    defaultValue={this.props.defaultText}>
                </input>
            </div>
        );
    }
}

export default TextInputComponent;
