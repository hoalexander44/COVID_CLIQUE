import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'
import InputPasswordComponent from '../components/InputPasswordComponent'

let nameFriend = ''
class friendListPage extends Component {
    friendNameChange = (event) => {
        nameFriend = event.target.value;
        console.log(nameFriend);
    }

    addFriend = () => {
        fetch("http://localhost:5001/addFriend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                friendName: nameFriend,
                username: "username",
            })
        }).then(function (response) {
            if (response.status === 200) {
                console.log("Success");
            } else {
                console.log("Failure");
            }
        })
    }

    render() {
        return (
            <div>
                <LinkBar />
                <div className="form">
                    <h1>ADD FRIEND</h1>
                    <TextInputComponent label="Friend Username: " logChange={this.friendNameChange} />
                    <ButtonComponent label="Add Friend" isPressed={this.addFriend} />
                </div>

                <div className="form">
                    <h1>FRIEND LIST</h1>
                    <div className="dangerous">
                        USERNAMEGUYONE23
                    </div>
                    <div className="medium">
                        USERNAMEGUYONE23
                    </div>
                    <div className="low">
                        USERNAMEGUYONE23
                    </div>
                    <div className="low">
                        USERNAMEGUYONE23
                    </div>
                </div>
            </div>
        );
    }
}

export default friendListPage;
