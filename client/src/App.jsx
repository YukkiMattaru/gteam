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
        bglayer: {
            minWidth: width,
            minHeight: height,
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
        },
        outerLayout: {
            minWidth: width,
            minHeight: height,
            backgroundColor: 'rgba(38,34,76,0.3)',
            backgroundSize: 'cover'
        },
        innerLayout: {
            margin: '0 auto',
            padding: '0 30px',
            minWidth: '200px',
            width: '1200px',
            minHeight: height,
            display: 'flex',
            flexDirection: 'column',
        }
    }

    if (props.pathname === '/') {
        return (
            <div style={localStyles.bglayer}>
                <div style={localStyles.outerLayout}>
                    <div style={localStyles.innerLayout}>
                        <Header isMain={true}/>
                        <div>
                            <Main/>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.appWrapper}>
                <Header isMain={false}/>
                <div>
                    <Route exact path="/profile" render={() => <Profile/>}/>
                    <Route exact path="/tradearea" render={() => <TradeArea/>}/>
                    <Route exact path="/register" render={() => <Register/>}/>
                    <Route exact path="/login" render={() => <Login/>}/>
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
        console.log(this.props.history.location.pathname)
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