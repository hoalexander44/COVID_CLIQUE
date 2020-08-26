import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";


class NotFound extends Component {
  render() {
    return(
    	<div>
    		<h1>404 Page Not Found</h1>
    	</div>
    );
  }
}

export default NotFound;
