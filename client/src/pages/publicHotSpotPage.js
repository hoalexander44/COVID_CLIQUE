import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import DocumentMeta from 'react-document-meta';
import ButtonComponent from '../components/ButtonComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const meta = { name: "viewport", content: "width=device-width, initial-scale=1.0" }
class publicHotSpot extends Component {
    constructor() {
        super();
        this.state = {
            locationUI: []
        };
    }

    async componentDidMount() {

        let response = await fetch("http://localhost:5001/getLocations", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        let responseJson = await response.json();
        console.log(responseJson);
        this.refreshLocationUI(-1);
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


    async refreshLocationUI(order) {
        let locationInfo = await this.getLocationInfo();
        this.updateLocationUI(locationInfo.locations, order)
    }


    updateLocationUI(locationInfo, order) {
        console.log(locationInfo);
        let rawScores = [];
        for (let x = 0; x < locationInfo.length; x++) {
            rawScores.push(locationInfo[x].location_score);
        }

        let smallToLargeScore = this.copyArray(rawScores);
        smallToLargeScore.sort(function (a, b) { return a - b });

        let largeToSmallScore = this.copyArray(rawScores);
        largeToSmallScore.sort(function (a, b) { return b - a });


        let table = [];

        let chosenSortedList = [];
        if (order == -1) {
            chosenSortedList = this.copyArray(largeToSmallScore);
        }
        else {
            chosenSortedList = this.copyArray(smallToLargeScore);
        }

        console.log(chosenSortedList);


        for (let i = 0; i < chosenSortedList.length; i++) {

            let divKey = "friendStats" + i;
            let nameKey = "friendName" + i;
            let pointKey = "Points" + i;


            let matchFind = this.findMatching(locationInfo, chosenSortedList[i])
            let index = matchFind.index;
            console.log(index);

            let className = 'low';
            if (chosenSortedList[i] > 20000 ) {
                className = "dangerous";
            }
            else if (chosenSortedList[i] <= 20000 && chosenSortedList[i] > 500) {
                className = "medium";
            }
            else {
                className = "low";
            }

            //let infection = '';
            //if (friendInfo[index].isinfected) {
            //    infection = '\u25C8'
            //}

            table.push(
                <div key={divKey} className={className} > <div key={nameKey}>{locationInfo[index].location_name}</div><div key={pointKey}>Points: {chosenSortedList[i]}</div></ div>
            )
            locationInfo.splice(index, 1);
        }


        this.setState({ locationUI: table });
    }

    copyArray(arrToCopy) {
        let copyArray = [];
        for (let i = 0; i < arrToCopy.length; i++) {
            copyArray.push(arrToCopy[i]);
        }
        return copyArray;
    }

    findMatching(locationInfoList, score) {
        console.log("SCORE: " + score);
        let index = 0;
        let found = false;
        for (let i = 0; i < locationInfoList.length; i++) {
            if (locationInfoList[i].location_score == score) {
                index = i;
                found = true;
            }
        }

        return { index: index, found: found }
    }

    lowToHigh = () => {
        this.refreshLocationUI(-1);
    }

    highToLow = () => {
        this.refreshLocationUI(1);
    }

    render() {
        return (
            <div>
                <DocumentMeta {...meta} />
                <div className="forceMargin">
                    <h1><Link to={{ pathname: "/", }}> <FontAwesomeIcon icon={faArrowLeft} /> GO BACK</Link></h1>
                <ButtonComponent label="Best Score to Worst Score" isPressed={this.highToLow} />
                <ButtonComponent label="Worst Score to Best Score" isPressed={this.lowToHigh} />
                    {this.state.locationUI}
                </div>
            </div>
        );
    }
}

export default publicHotSpot;
