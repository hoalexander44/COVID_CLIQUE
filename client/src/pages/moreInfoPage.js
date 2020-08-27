import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import DocumentMeta from 'react-document-meta';
import ButtonComponent from '../components/ButtonComponent'

const meta = { name: "viewport", content: "width=device-width, initial-scale=1.0" }
class moreInfoPage extends Component {
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
                <h1>MORE INFO</h1>
                <h2>VERSION 1.0</h2>
                <p>User Corona Clique to track the covid exposure level of you, your friends, and your surround locations</p>
                <h2 className="flavorText">What should I do?</h2>
                <p>When you go to a public location, let your friends know by entering the location into this app. By updating your location you will update your score!</p>
                    <h2 className="flavorText">How do I get a good score?</h2>
                <p> A lower score indicates that you have been quarantining! A higher score indicates that you have been going out more. You get points for every minute you avoid
                    public outings. Try to avoid highly exposed areas to retain your score. Once you enter a location you have visited, we will let you know how many points you have earned! </p>


                    <h2 className="flavorText">How we calculate location threat levels</h2>
                <p> We record how many times locations have been visited by our users. Once a location is visited we increase the exposure level of a location.</p>
                    <h2 className="flavorText">Why Report an infection?</h2>
                    <p>You can help keep your friends and others around you safer! A symbol
                        will also be shown to people who follow you that you have been diagnosed. We use this information to make further calculations into the exposure levels of locations. </p>



                    <div></div>
                </div>

            </div>
        );
    }
}

export default moreInfoPage;
