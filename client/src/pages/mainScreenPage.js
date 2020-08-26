import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'
import ButtonComponent from '../components/ButtonComponent'

class mainScreenPage extends Component {
    render() {
        return (
            <div>
                <LinkBar />
                <h1>MAIN SCREEN</h1>
                <ButtonComponent label="LOGIN" />
                <ButtonComponent label="HOT SPOTS" />
            </div>
        );
    }
}

export default mainScreenPage;
