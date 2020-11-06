import {Component} from "react";
import React from 'react';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import {BrowserRouter, Route} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import styles from './App.module.css';
import Main from "./components/Main/Main";
import Profile from "./components/Profile/Profile";
import TradeArea from "./components/TradeArea/TradeArea";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className={styles.appWrapper}>
                    <Header/>
                    <Nav/>
                    <div className={styles.content}>
                        <Route exact path="/" component={Main}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/tradearea" component={TradeArea}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;