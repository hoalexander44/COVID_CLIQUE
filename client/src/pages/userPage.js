import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import ButtonComponent from '../components/ButtonComponent'
import TextInputComponent from '../components/TextInputComponent'
import DocumentMeta from 'react-document-meta';

let locationName = '';
const meta = { name:"viewport", content:"width=device-width, initial-scale=1.0"}
class userPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            linkBar: null,
            locationsUI: null,
            score: 0,
            levelStyle: ''
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

        this.updateLevelStyle(responseJson.score);

        let locationInfo = await this.getLocationInfo();
        console.log(locationInfo.locations);

        let UITable = [];
        for (let i = 0; i < locationInfo.locations.length; i++) {
            UITable.push(<p>{locationInfo.locations[i].location_name}</p>)
        }
        this.setState({locationsUI: UITable})
    }

    updateLevelStyle(score) {
        console.log(score)
        if (score > 1000) {
            this.setState({ levelStyle: "dangerousText" })
        }
        else if (score >= 500 && score <= 1000) {
            this.setState({ levelStyle: "mediumText" })
        }
        else {
            this.setState({ levelStyle: "lowText" })
        }
    }

    async getLocationInfo() {
        let response = await fetch("http://localhost:5001/getLocations", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        let responseJson = await response.json();
        return responseJson;
    } 


    // keeps track of the add friend input
    locationNameChange = (event) => {
        locationName = event.target.value;
        //console.log(locationName);
    }


    addData = (event) => {
        console.log("werwerwe");
        this.connections();


    }

    async connections() {
        await this.addDataConnection();
        await this.updateUIConnection();
    }

    async addDataConnection() {
        let response = await fetch("http://localhost:5001/addUserData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                location_name: locationName
            })
        })
    }

    async updateUIConnection() {
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
        this.updateLevelStyle(responseJson.score);
        console.log(responseJson);

    }


    render() {
        return (
            <div>
                <DocumentMeta {...meta} />
                {this.state.linkBar}
                <div className = "forceMargin">
                <h1>EXPOSURE LEVEL</h1>
                <div className={this.state.levelStyle} > { this.state.score }</div>
                <div>
                    <h2>THANK YOU FOR HELPING TO FIGHT COVID 19</h2>
                    <div className="form">
                        <TextInputComponent label="Where have you been? " logChange={this.locationNameChange}/>
                        <ButtonComponent label="SUBMIT" isPressed={this.addData} />
                        <h4> Suggested Locations </h4>
                        {this.state.locationsUI}

                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default userPage;
