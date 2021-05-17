import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";// pages
import LoginPage from './components/Auth/LoginPage';
import Index from "./views/Index";
import Tab from "./views/HomePage/Tab";
import {PrivateRoute} from './components/PrivateRoute';

class Routes extends Component {
    render() {
        return (
            <Switch>   
                <Route path="/index" component={Index}></Route>
                <Route path="/login" component ={LoginPage}></Route>
                <PrivateRoute exact path="/home" component ={Tab}>
                </PrivateRoute>
                <Redirect to="/index" />
            </Switch>
        );
    }
}

export default Routes;