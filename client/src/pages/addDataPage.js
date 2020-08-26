import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'

class addDataPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            linkBar: null
        };
    }

    async componentDidMount() {
        console.log(this.props.location.state.username)
        await this.setState({ username: this.props.location.state.username })
        let table = [];
        table.push(
            <LinkBar key="linkBar" username={this.props.location.state.username} />
        )
        await this.setState({ linkBar: table })
    }

    render() {
        return (
            <div>
                {this.state.linkBar}
                <h1>THANK YOU FOR HELPING TO FIGHT COVID 19</h1>
                <div className="form">
                    <TextInputComponent label="Where did you visit?" />
                    <TextInputComponent label="When did you visit?" />
                    <TextInputComponent label="Did you see any friends?" />
                    <TextInputComponent label="Did you meet anyone?" />
                    <ButtonComponent label="SUBMIT" />
                    
                </div>
            </div>
        );
    }
}

export default addDataPage;
