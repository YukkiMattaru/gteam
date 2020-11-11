import React from 'react';
import styles from './Nav.module.css';
import {NavLink} from "react-router-dom";
import {logoutThunk} from "../../redux/authReducer";
import {connect} from "react-redux";

const AuthNav = (props) => {
    {
        if (props.isAuth)
            return (
                <div className={styles.authBlock}>
                    <NavLink to='/profile'><span>{props.userName}</span></NavLink>
                    <NavLink onClick={props.logout} to='/'>Выход</NavLink>
                </div>
            )
        else {
            return (
                <div className={styles.authBlock}>
                    <div><NavLink onClick={props.logout} to='/login'>Вход</NavLink></div>
                    <div><NavLink onClick={props.logout} to='/register'>Регистрация</NavLink></div>
                </div>
            )
        }
    }

}

const Nav = (props) => {
    return (
        <div className={styles.navWrapper}>
            <nav>
                <div className={styles.navItem}>
                    <NavLink activeClassName={styles.active} exact to='/'>Главная</NavLink>
                </div>
                <div className={styles.navItem}>
                    <NavLink activeClassName={styles.active} to='/tradearea'>Торговая площадка</NavLink>
                </div>
                <div className={styles.navItem}>
                    <NavLink activeClassName={styles.active} to='/documents'>Документы</NavLink>
                </div>
                <div className={styles.navItem}>
                    <NavLink activeClassName={styles.active} to='/documents'>О &laquo;зеленых&raquo; сертификатах</NavLink>
                </div>
                <div className={styles.navItem}>
                    <NavLink activeClassName={styles.active} to='/contacts'>Контакты</NavLink>
                </div>
                <div className={`${styles.navItem} ${styles.navAuthItem}`}>
                    <AuthNav userName={props.userName} logout={props.logoutThunk} isAuth={props.isAuth}/>
                </div>
            </nav>
        </div>
    );
}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userName: state.auth.userName
})

export default connect(mapStateToProps, {logoutThunk})(Nav);
