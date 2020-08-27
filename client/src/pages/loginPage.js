import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'
import InputPasswordComponent from '../components/InputPasswordComponent'
import LinkBar from '../components/LinkBar'

let username = '';
let password = '';

class loginPage extends Component {
    constructor() {
        super();
        this.state = {
            isLoginWrong: false
        };
    }

    usernameChange = (event) => {
        username = event.target.value;
        //console.log(username);
    }

    passwordChange = (event) => {
        password = event.target.value;
        //console.log(password);
    }

    login = (event) => {
        this.requestLogin();
    }

    async requestLogin() {
        let sendUsername = username;
        let authResponse = await fetch("http://localhost:5001/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                plaintextPassword: password
            })
        })
        if (authResponse.status == 200) {
            this.setState({ isLoginWrong: false });
            this.props.history.push(
                {
                    pathname: "/userPage",
                    state: {
                        username: sendUsername,
                    }
                }
            );
        }
        else {
            console.log("authentication failure");
            this.setState({ isLoginWrong: true });
        }
    }

    goToPublicHotSpots = (event) => {
        console.log("hi");
        this.props.history.push(
            {
                pathname: "/publicHotSpot"
            }
        );
    }


    render() {
        return (
            <div>
                <div className="form">
                    <h1 className="nonInputText">LOGIN</h1>
                    <TextInputComponent label="Username: " logChange={this.usernameChange} />
                    <InputPasswordComponent type="password" label="Password: " logChange={this.passwordChange} />
                    <ButtonComponent label="Login" isPressed={this.login} />
                    {
                        this.state.isLoginWrong
                            ? <h3>Incorrect Username or Password</h3>
                            : <p></p>
                    }
                    <Link to="/register"> Register </Link>




                </div>
                <button className="giantButton" onClick={this.goToPublicHotSpots}> HOT SPOTS </button>
            </div>
        );
    }
}

export default loginPage;
