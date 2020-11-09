import {Component} from "react";
import React from 'react';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import {BrowserRouter, Route} from "react-router-dom";
import styles from './App.module.css';
import Main from "./components/Main/Main";
import Profile from "./components/Profile/Profile";
import TradeArea from "./components/TradeArea/TradeArea";
import Register from "./components/Register/Register";
import {connect} from "react-redux";
import Login from "./components/Login/Login";
import {initializeApp} from "./redux/appReducer";

class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <div>

            </div>
        }
        return (
            <BrowserRouter>
                <div className={styles.appWrapper}>
                    <Header/>
                    <Nav/>
                    <div className={styles.content}>
                        <Route exact path="/" render={() => <Main/>}/>
                        <Route exact path="/profile" render={() => <Profile/>}/>
                        <Route exact path="/tradearea" render={() => <TradeArea/>}/>
                        <Route exact path="/register" render={() => <Register/>}/>
                        <Route exact path="/login" render={() => <Login/>}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

const mapDispatchToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapDispatchToProps, {initializeApp})(App);