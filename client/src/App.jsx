import {Component} from "react";
import React from 'react';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import {BrowserRouter, Route} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import styles from './App.module.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className={styles.appWrapper}>
                    <Header/>
                    <Nav/>
                    <div className={styles.content}>
                        <Route exact path="/" component={null}/>
                        <Route exact path="/profile" component={null}/>
                        <Route exact path="/tradearea" component={null}/>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;