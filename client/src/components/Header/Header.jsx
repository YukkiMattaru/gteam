import React from 'react';
import styles from './Header.module.css';
import icon from '../../assets/images/newicon4.png';
import Nav from "../Nav/Nav";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    let classNames = props.isMain ? `${styles.header} ${styles.headerMain}`
        : `${styles.header} ${styles.headerWorkspace}`
    return (
        <div className={classNames}>
            <header>
                <div className={styles.icon}><NavLink exact to={'/'}><img src={icon} alt="icon"/></NavLink></div>
                <Nav isMain={props.isMain}/>
            </header>
        </div>
    );
}

export default Header;