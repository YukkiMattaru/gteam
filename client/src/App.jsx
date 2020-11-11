import {Component, useEffect, useState} from "react";
import React from 'react';
import {withRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import TradeArea from "./components/TradeArea/TradeArea";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import {compose} from "redux";
import bg from "./assets/images/header-bg.jpg";
import Main from "./components/Main/Main";
import styles from "./App.module.css";

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
        main: {
            bglayer: {
                minWidth: width,
                minHeight: height,
            },
            outerLayout: {
                minWidth: width,
                minHeight: height,

            },
            innerLayout: {
                minHeight: height,
            },
        },
        workspace: {
            outerLayout: {
                minWidth: width,
                minHeight: height,
                background: 'linear-gradient(-45deg, rgb(80, 91, 114),rgb(48, 61, 85))',
                backgroundSize: 'cover'
            },
            innerLayout: {
                minHeight: height,
            }
        }
    }

    if (props.pathname === '/' || props.pathname === '/register' || props.pathname === '/login') {
        return (
            <div style={localStyles.main.bglayer} className={styles.bglayer}>
                <div style={localStyles.main.outerLayout} className={styles.outerLayout}>
                    <div style={localStyles.main.innerLayout} className={styles.innerLayout}>
                        <Header isMain={true}/>
                        <div>
                            <Route exact path="/" render={() => <Main/>}/>
                            <Route exact path="/register" render={() => <Register/>}/>
                            <Route exact path="/login" render={() => <Login/>}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div style={localStyles.workspace.outerLayout} className={styles.outerLayoutWorkspace}>
                <div style={localStyles.workspace.innerLayout} className={styles.innerLayout}>
                    <Header isMain={false}/>
                    <div>
                        <Route exact path="/profile" render={() => <Profile/>}/>
                        <Route exact path="/tradearea" render={() => <TradeArea/>}/>
                    </div>
                </div>
            </div>
        )
    }
}

class AppContainer extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <App pathname={this.props.history.location.pathname}/>
        )
    }
}

const mapDispatchToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(connect(mapDispatchToProps, {initializeApp}), withRouter)(AppContainer);