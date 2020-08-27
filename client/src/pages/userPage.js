import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import ButtonComponent from '../components/ButtonComponent'
import TextInputComponent from '../components/TextInputComponent'
import CheckBoxComponent from '../components/CheckBoxComponent'
import DocumentMeta from 'react-document-meta';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'


let locationName = '';
let isInfected = false;
let hasSymptoms = false;

const meta = { name:"viewport", content:"width=device-width, initial-scale=1.0"}
class userPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            linkBar: null,
            locationsUI: null,
            score: 0,
            levelStyle: '',
            submittedReport: false,
            submittedLocation: false,
            lastPublicOuting: '0/0/000',
            pointDiff: ''
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

        await this.updateLastPublicOuting(responseJson.last_location_time);


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

    async updateLastPublicOuting(lastLocationTime) {
        let newDate = new Date(lastLocationTime);
        let hours = newDate.getHours();
        let timeAMPM = '';

        if (hours >= 12) {
            timeAMPM = 'PM';
        }
        else {
            timeAMPM = 'AM';
        }
        hours = hours % 12;
        if (hours == 0) {
            hours = 12;
        }

        let minutes = String(newDate.getMinutes()).padStart(2, '0');
        let month = String(newDate.getMonth() + 1).padStart(2, '0');
        let year = String(newDate.getFullYear()).padStart(2, '0');
        let day = String(newDate.getDate()).padStart(2, '0');

        let dateString = month + "/" + day + "/" + year + "    " + hours + ":" + minutes + " " + timeAMPM;
        this.setState({ lastPublicOuting: dateString })
    }

    updateLevelStyle(score) {
        console.log(score)
        if (score > 20000) {
            this.setState({ levelStyle: "dangerousText" })
        }
        else if (score >= 500 && score <= 20000) {
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

        let scoreDiff = responseJson.score - this.state.score;
        console.log("POINTS GAINED: " + scoreDiff);
        if (scoreDiff < 0) {
            this.setState({ pointDiff: "-" + scoreDiff })
        }
        else {
            this.setState({ pointDiff: "+" + scoreDiff })
        }

        this.setState({ score: responseJson.score });

        this.setState({lastPublicOuting: responseJson.last_location_time})
        this.setState({ submittedLocation: true });
        this.updateLevelStyle(responseJson.score);
        await this.updateLastPublicOuting(responseJson.last_location_time);
        console.log(responseJson);

    }

    recordInfected = (event) => {
        isInfected = event.target.checked;
        console.log(isInfected);
    }

    recordSymptoms = (event) => {
        hasSymptoms = event.target.checked;
        console.log(hasSymptoms);
    }

    selfReport = (event) => {
        this.reportConnection();
        this.setState({ submittedReport: true });
    }

    async reportConnection() {
        let response = await fetch("http://localhost:5001/selfReport", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                isInfected: isInfected,
                hasSymptoms: hasSymptoms
            })
        })
    }

    render() {
        return (
            <div>
                <DocumentMeta {...meta} />
                {this.state.linkBar}
                <div className = "forceMargin">
                    <h1>EXPOSURE LEVEL</h1>
                    <div className={this.state.levelStyle}> {this.state.score}</div>
                    <h3 className="orangeSimpleText">{this.state.pointDiff}</h3>
                    <h3>Last Public Outing: </h3>
                    <h2>{this.state.lastPublicOuting}</h2>

                    <div>
                        <div className="form">


                            <h3><TextInputComponent label="Where have you been? " logChange={this.locationNameChange} /></h3>
                            <h4> Suggested Locations </h4>
                            {this.state.locationsUI}
                            <ButtonComponent label="SUBMIT" isPressed={this.addData} />
                            {
                                this.state.submittedLocation
                                    ? <p className="flavorText"> Thank you! </p>
                                    : <p></p>
                            }



                            </div>
                    </div>

                    <div className="form">
                        <h2> Symptoms                             <Link to={{ pathname: "/symptoms", state: { username: this.state.username }}}> <FontAwesomeIcon icon={faQuestionCircle} /> </Link></h2>
                        <input className="largerCheckBox" type="checkbox" id="infected" name="infected" onChange={this.recordSymptoms} />

                        <h2> Infected </h2>
                        <input className = "largerCheckBox" type="checkbox" id="infected" name="infected" onChange={this.recordInfected} />



                        <ButtonComponent label="REPORT" isPressed={this.selfReport} />

                        {
                            this.state.submittedReport
                                ? <p className="flavorText"> Thank you for reporting! Your input is extremely important for the safety of others! </p>
                                : <p></p>
                        }
                    </div>


                </div>

            </div>
        );
    }
}

export default userPage;
