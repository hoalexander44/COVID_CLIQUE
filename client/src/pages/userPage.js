import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import ButtonComponent from '../components/ButtonComponent'
import TextInputComponent from '../components/TextInputComponent'
import DocumentMeta from 'react-document-meta';

const meta = { name:"viewport", content:"width=device-width, initial-scale=1.0"}
class userPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            linkBar: null,
            score: 0
        };
    }

    async componentDidMount() {
        //console.log(this.props.location.state.username)
        await this.setState({ username: this.props.location.state.username })
        let table = [];
        table.push(
            <LinkBar key="linkBar" username={this.props.location.state.username}/>
        )
        await this.setState({ linkBar: table })

        let response = await fetch("http://localhost:5001/getUserData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
            })
        })

        let responseJson = await response.json();
        this.setState({ score: responseJson.score });
        console.log(responseJson);
    }

    render() {
        return (
            <div>
                <DocumentMeta {...meta} />
                {this.state.linkBar}
                <h1>YOUR SCORE</h1>
                <div className="bigText">{this.state.score}</div>
                <div>
                    <h2>THANK YOU FOR HELPING TO FIGHT COVID 19</h2>
                    <div className="form">
                        <TextInputComponent label="Where have you been? " />
                        <ButtonComponent label="SUBMIT" />

                    </div>
                </div>
            </div>
        );
    }
}

export default userPage;
