import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import homePage from './pages/homePage'
import NotFound from './pages/404Page'
import userPage from './pages/userPage'
import register from './pages/register'
import mainScreenPage from './pages/mainScreenPage'
import loginPage from './pages/loginPage'
import innerCircle from './pages/innerCircle'
import hotSpotPage from './pages/hotSpotPage'
import friendList from './pages/friendList'
import addDataPage from './pages/addDataPage'
import moreInfoPage from './pages/moreInfoPage'
import symptomsPage from './pages/symptomsPage'
import axios from 'axios';



class App extends Component{

    componentDidMount = () => {
        axios.get("http://localhost:5001/weather").then(response => {
            console.log(response);
            console.log("wow");
        });

        console.log("wow");
        //fetch("https://cors-anywhere.herokuapp.com/http://localhost:5000/weather").then(function (response) {
        //    console.log(response);
        //    return response.text();
        //}).then(function (data) {
        //    console.log(data);
        //});
    }

  render(){
    return (
        <div className="App">

            <Router>
                <Switch>
                    <Route exact path="/" component={loginPage} />
                    <Route exact path="/loginPage" component={loginPage} />
                    <Route exact path="/userPage" component={userPage} />
                    <Route exact path="/register" component={register} />
                    <Route exact path="/mainScreenPage" component={mainScreenPage} />
                    <Route exact path="/innerCircle" component={innerCircle} />
                    <Route exact path="/hotSpotPage" component={hotSpotPage} />
                    <Route exact path="/friendList" component={friendList} />
                    <Route exact path="/addDataPage" component={addDataPage} />
                    <Route exact path="/moreInfo" component={moreInfoPage} />
                    <Route exact path="/symptoms" component={symptomsPage} />

                    <Route exact path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </Router>
      </div>
    );
  }
}

export default App;
