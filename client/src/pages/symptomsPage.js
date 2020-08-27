import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import DocumentMeta from 'react-document-meta';
import ButtonComponent from '../components/ButtonComponent'

const meta = { name: "viewport", content: "width=device-width, initial-scale=1.0" }
class symptomsPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            linkBar: null,
        };
    }

    async componentDidMount() {
        if (this.props.location.state !== undefined) {
            //console.log(this.props.location.state.username)
            await this.setState({ username: this.props.location.state.username })
            let table = [];
            table.push(
                <LinkBar key="linkBar" username={this.props.location.state.username} />
            )
            await this.setState({ linkBar: table })
        }
        else {
            this.props.history.push(
                {
                    pathname: "/"
                }
            );
        }

    }

    render() {
        return (
            <div>
                <DocumentMeta {...meta} />
                {this.state.linkBar}
                <div className="forceMargin">
                    <h2 className="flavorText">Please report that you have symptoms if you experience any of the following</h2>
                    <p>Fever or chills</p>
                    <p>Cough</p>
                    <p>Shortness of breath or difficulty breathing</p>
                    <p>Fatigue</p>
                    <p>Muscle or body aches</p>
                    <p>Headache</p>
                    <p>New loss of taste or smell</p>
                    <p>Sore throat</p>
                    <p>Congestion or runny nose</p>
                    <p>Nausea or vomiting</p>
                    <p>Diarrhea</p>


                    <div></div>
                </div>

            </div>
        );
    }
}

export default symptomsPage;
