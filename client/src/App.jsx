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
import Register from "./components/Register/Register";
import {Provider} from "react-redux";
import store from "./redux/store";
import Login from "./components/Login/Login";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
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
                </Provider>
            </BrowserRouter>
        )
    }
}

export default App;