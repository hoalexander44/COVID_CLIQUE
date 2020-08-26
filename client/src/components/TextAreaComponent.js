import React, { Component } from 'react';


class TextAreaComponent extends Component {
    render() {
        return (
            <div>
                <label for="textArea">
                    {this.props.label}
                </label>

                <textarea
                    name="textArea"
                    rows="4"
                    cols="50"
                    onChange={this.props.logChange}
                    defaultValue={this.props.defaultText}>
                </textarea>
            </div>
        );
    }
}

export default TextAreaComponent;
