import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from "axios";
import LinkBar from '../components/LinkBar'

class hotSpotPage extends Component {
    render() {
        return (
            <div>
                <LinkBar />
                <h1>HOT SPOT PAGE</h1>
            </div>
        );
    }
}

export default hotSpotPage;
