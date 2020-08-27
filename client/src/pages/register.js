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

class registerPage extends Component {
    constructor() {
        super();
        this.state = {
            registerMessage: ''
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

    postRegister = (event) => {
        this.registerConnection();
        //fetch("http://localhost:5001/user", {
        //    method: "POST",
        //    headers: {
        //        "Content-Type": "application/json"
        //    },
        //    body: JSON.stringify({
        //        username: username,
        //        plaintextPassword: password,
        //    })
        //}).then(function (response) {
        //    if (response.status === 200) {
        //        console.log("Success");
        //    } else {
        //        console.log("Failure");
        //    }
        //})
    }

    async registerConnection() {
        let response = await fetch("http://localhost:5001/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                plaintextPassword: password,
            })
        });

        if (response.status === 200) {
            console.log("Success");
            this.setState({registerMessage: "REGISTERED!"})
        } else {
            console.log("Failure");
            this.setState({ registerMessage: "Registration failed" })
        }
    }

    render() {
        return (
            <div>
                <div className="form">
                    <h1>REGISTER</h1>
                    <TextInputComponent label="Username: " logChange={this.usernameChange} />
                    <InputPasswordComponent type="password" label="Password: " logChange={this.passwordChange} />
                    <ButtonComponent label="Register" isPressed={this.postRegister} />
                    <Link to="/"> Login </Link>
                    <h3>{this.state.registerMessage}</h3>
                </div>
            </div>
        );
    }
}

export default registerPage;
