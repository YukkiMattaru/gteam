import React, {useEffect, useState} from 'react';
import bg from '../../assets/images/header-bg.jpg';
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Main from "../Main/Main";
import {Route, withRouter} from "react-router-dom";
import Profile from "../Profile/Profile";
import TradeArea from "../TradeArea/TradeArea";
import Register from "../Register/Register";
import Login from "../Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import styles from './App.module.css';

const App = (props) => {
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0);

    let updateDimensions = () => {
        setWidth(document.documentElement.clientWidth);
        setHeight(document.documentElement.clientHeight);
    };

    window.addEventListener('resize', updateDimensions)

    useEffect(() => {
        updateDimensions();
    })

    let localStyles = {
        bglayer: {
            minWidth: width,
            minHeight: height,
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover'
        },

    }

    if (props.history.location.pathname === '/') {
        return (
            <div style={localStyles.bglayer}>
                <div className={styles.headerWrapper}>
                    <div className={styles.headerOnMain}><Header/></div>
                    <div className={styles.navMain}><Nav/></div>
                </div>
                <div className={styles.content}>
                    <Main/>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className={styles.headerWrapperOnMain}>
                    <div className={styles.header}><Header/></div>
                    <Nav/>
                </div>
                <div className={styles.content}>
                    <Route exact path="/profile" render={() => <Profile/>}/>
                    <Route exact path="/tradearea" render={() => <TradeArea/>}/>
                    <Route exact path="/register" render={() => <Register/>}/>
                    <Route exact path="/login" render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

export default compose(connect(mapStateToProps, {}), withRouter)(App)