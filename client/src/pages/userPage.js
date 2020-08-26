import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import ButtonComponent from '../components/ButtonComponent'

class userPage extends Component {
    constructor() {
        super();
        this.state = {
            username: ""
        };
    }

    async componentDidMount() {
        //console.log(this.props.location.state.username)
        await this.setState({ username: this.props.location.state.username })
    }

    render() {
        return (
            <div>
                <LinkBar />
                <h1>USER PAGE</h1>
                <ButtonComponent label="ADD DATA" />
                <ButtonComponent label="ADD FRIEND" />
            </div>
        );
    }
}

export default userPage;
