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
            linkBar: null
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
    }

    render() {
        return (
            <div>
                <DocumentMeta {...meta} />
                {this.state.linkBar}
                <h1>YOUR SCORE</h1>
                <div className="bigText">2020</div>
                <div>
                    <h1>THANK YOU FOR HELPING TO FIGHT COVID 19</h1>
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
