import React from 'react';
import styles from './Nav.module.css';
import {NavLink} from "react-router-dom";

const Nav = (props) => {
    return (
        <nav className={styles.nav}>
            <div className={styles.item}>
                <NavLink activeClassName={styles.active} exact to='/'>На главную</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink activeClassName={styles.active} to='/profile'>Личный кабинет</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink activeClassName={styles.active} to='/tradearea'>Торговая площадка</NavLink>
            </div>
        </nav>
    );
}

export default Nav;