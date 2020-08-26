import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './component.css';

class LinkBar extends Component {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th><Link to="/"> Home </Link> </th>
                        <th><Link to="/mainScreenPage"> Main Screen </Link></th>
                        <th><Link to="/userPage"> User Page </Link></th>
                        <th><Link to="/innerCircle"> Inner Circle </Link></th>
                        <th><Link to="/hotSpotPage"> Hot Spot Page </Link></th>
                        <th><Link to="/friendList"> Friend List </Link></th>
                        <th><Link to="/addDataPage"> Add Data Page </Link></th>
                        <th><Link to="/loginPage"> LOGIN </Link></th>
                        <th><Link to="/register"> REGISTER </Link></th>

                    </tr>
                        </tbody>
                </table>
            </div>
        );
    }
}

export default LinkBar;
