import React from 'react';
import styles from './Profile.module.css';
import {connect} from "react-redux";
import {Route, NavLink, Redirect} from "react-router-dom";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileCounters from "./ProfileCounters/ProfileCounters";
import ProfileCertificates from "./ProfileCertificates/ProfileCertificates";

class ProfileComponent extends React.Component {
    render() {
        return <Profile userName={this.props.userName} userType={this.props.userType} isAuth={this.props.isAuth}/>
    }
}

const Profile = (props) => {
    if (props.isAuth) {
        return (
            <div className={styles.profile}>
                <div className={styles.profileTitle}><h2>Личный кабинет пользователя {props.userName}</h2></div>
                <div className={styles.profileContent}>
                    <ProfileInfo/>
                    <ProfileCounters/>
                    <ProfileCertificates/>
                </div>
            </div>
        )
    } else return <Redirect to='/login'/>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userName: state.auth.userName,
    userType: state.auth.userType
})


export default connect(mapStateToProps, {})(ProfileComponent);