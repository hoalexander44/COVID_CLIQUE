import React, { Component } from 'react';


class ButtonComponent extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.isPressed}> {this.props.label} </button>
            </div>
        );
    }
}

export default ButtonComponent;
