import React from 'react';
import styles from './Profile.module.css';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class ProfileComponent extends React.Component {
    render() {
        debugger;
        return <Profile isAuth={this.props.isAuth} />
    }
}

const Profile = (props) => {
    debugger;
    if (props.isAuth) {
        return (
            <div className={styles.profile}>
                Profile
            </div>
        )
    }
    else return <Redirect to='/login'/>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {} )(ProfileComponent);