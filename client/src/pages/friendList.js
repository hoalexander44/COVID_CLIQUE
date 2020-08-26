import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'
import InputPasswordComponent from '../components/InputPasswordComponent'
import DocumentMeta from 'react-document-meta';

let nameFriend = ''
const meta = { name: "viewport", content: "width=device-width, initial-scale=1.0" }
class friendListPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            linkBar: null,
            friendInfo: [],
            friendUI: []
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
        //let friendInfo = await this.getFriendsInfo();
        //this.updateFriendUI(friendInfo.friendInfoList)
        await this.refreshFriendUI();
    }


    // keeps track of the add friend input
    friendNameChange = (event) => {
        nameFriend = event.target.value;
        //console.log(nameFriend);
    }

    // adds a friend
    addFriend = (event) => {
        fetch("http://localhost:5001/addFriend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                friendName: nameFriend,
                username: this.state.username,
            })
        }).then(function (response) {
            if (response.status === 200) {
                console.log("Success");
            } else {
                console.log("Failure");
            }
        })
        this.refreshFriendUI(1);

    }

    async refreshFriendUI(order) {
        let friendInfo = await this.getFriendsInfo();
        this.updateFriendUI(friendInfo.friendInfoList, order)
    }

    // gets a list of friends
    async getFriendsInfo() {
        let response = await fetch("http://localhost:5001/getFriends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
            })
        })

        let responseJson = await response.json();
        return responseJson;
    }

    updateFriendUI(friendInfo, order) {
        console.log(friendInfo);
        let rawScores = [];
        for (let x = 0; x < friendInfo.length; x++) {
            rawScores.push(friendInfo[x].score);
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


        for (let i = 0; i < chosenSortedList.length; i++){

            let divKey = "friendStats" + i;
            let nameKey = "friendName" + i;
            let pointKey = "Points" + i;


            let matchFind = this.findMatching(friendInfo, chosenSortedList[i])
            let index = matchFind.index;
            console.log(index);

            let className = 'low';
            if (chosenSortedList[i] > 1000) {
                className = "dangerous";
            }
            else if (chosenSortedList[i] >= 500 && chosenSortedList[i] <= 1000) {
                className = "medium";
            }
            else {
                className = "low";
            }

            let infection = '';
            if (friendInfo[index].isinfected) {
                infection = '\u25C8'
            }

            table.push(
                <div key={divKey} className={className} > <div key={nameKey}>{friendInfo[index].username} {infection}</div><div key={pointKey}>Points: {chosenSortedList[i]}</div></ div>
            )
            friendInfo.splice(index, 1);
        }


        this.setState({ friendUI: table });
    }

    copyArray(arrToCopy) {
        let copyArray = [];
        for (let i = 0; i < arrToCopy.length; i++) {
            copyArray.push(arrToCopy[i]);
        }
        return copyArray;
    }

    findMatching(friendInfoList, score) {
        console.log("SCORE: " + score);
        let index = 0;
        let found = false;
        for (let i = 0; i < friendInfoList.length; i++) {
            if (friendInfoList[i].score == score) {
                index = i;
                found = true;
            }
        }

        return {index: index, found: found}
    }

    lowToHigh= () => {
        this.refreshFriendUI(-1);
    }

    highToLow = () => {
        this.refreshFriendUI(1);
    }
    render() {
        return (
            <div>
                <DocumentMeta {...meta} />
                {this.state.linkBar}
                <div className="forceMargin">
                <div className="form">
                    <h1>ADD FRIEND</h1>
                    <TextInputComponent label="Friend Username: " logChange={this.friendNameChange} />
                    <ButtonComponent label="Add Friend" isPressed={this.addFriend} />
                </div>

                <div className="form">
                    <h2>Friend List</h2>
                    <ButtonComponent label="Best Score to Worst Score" isPressed={this.highToLow} />
                    <ButtonComponent label="Worst Score to Best Score" isPressed={this.lowToHigh} />
                    {this.state.friendUI}
                    </div>
                </div>
            </div>
        );
    }
}

export default friendListPage;
