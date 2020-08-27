import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './component.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

class LinkBar extends Component {
    constructor() {
        super();
        this.state = {
            username: ""
        };
    }

    async componentDidMount() {
        console.log("LINK BAR's USERNMAE: " + this.props.username);
        this.setState({ username: this.props.username });
        //console.log(this.props.location.state.username)
        //await this.setState({ username: this.props.location.state.username })
    }

    render() {
        return (
            <div>
                <script src='https://kit.fontawesome.com/a076d05399.js'></script>
                <table>
                    <tbody>
                        <tr>
                            <th><Link
                                to={{
                                    pathname: "/userPage",
                                    state: { username: this.props.username }
                                }}> <FontAwesomeIcon icon={faAddressCard} /> </Link></th>

                            <th><Link
                                to={{
                                    pathname: "/friendList",
                                    state: { username: this.props.username }
                                }}> <FontAwesomeIcon icon={faUserFriends} /> </Link></th>

                            <th><Link
                                to={{
                                    pathname: "/hotSpotPage",
                                    state: { username: this.props.username }
                                }}> <FontAwesomeIcon icon={faMap} /> </Link></th>

                            <th><Link
                                to={{
                                    pathname: "/moreInfo",
                                    state: { username: this.props.username }
                                }}> <FontAwesomeIcon icon={faQuestionCircle} /> </Link></th>


                    </tr>
                        </tbody>
                </table>
            </div>
        );
    }
}

export default LinkBar;
