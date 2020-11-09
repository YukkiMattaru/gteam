import React from 'react';
import styles from './Profile.module.css';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class ProfileComponent extends React.Component {
    render() {
        return <Profile userName={this.props.userName} userType={this.props.userType} isAuth={this.props.isAuth} />
    }
}

const Profile = (props) => {
    if (props.isAuth) {
        return (
            <div className={styles.profile}>
                <div>{props.userName}</div>
                <div>{props.userType}</div>
            </div>
        )
    }
    else return <Redirect to='/login'/>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userName: state.auth.userName,
    userType: state.auth.userType
})


export default connect(mapStateToProps, {} )(ProfileComponent);