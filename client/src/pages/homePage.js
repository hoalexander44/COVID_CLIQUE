import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'

class homePage extends Component {
    render() {
        return (
            <div>
                <div>
                    <LinkBar />
                    <h1>Overview</h1>
                    <div>
                        <Link to="/"> Home </Link>
                    </div>
                    <div>
                        <Link to="/userPage"> User Page </Link>
                    </div>
                    <div>
                        <Link to="/register"> Register </Link>
                    </div>
                    <div>
                        <Link to="/mainScreenPage"> Main Screen </Link>
                    </div>
                    <div>
                        <Link to="/loginPage"> Login </Link>
                    </div>
                    <div>
                        <Link to="/innerCircle"> Inner Circle </Link>
                    </div>
                    <div>
                        <Link to="/hotSpotPage"> Hot Spot Page </Link>
                    </div>
                    <div>
                        <Link to="/friendList"> Friend List </Link>
                    </div>
                    <div>
                        <Link to="/addDataPage"> Add Data Page </Link>
                    </div>
                    <div>
                        <Link to="/404"> Not Found </Link>
                    </div>

                </div>
            </div>
        );
    }
}

export default homePage;
