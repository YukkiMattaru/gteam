import React from 'react';
import styles from './Header.module.css';
import icon from '../../assets/images/newicon4.png';
import Nav from "../Nav/Nav";

const Header = (props) => {
    let classNames = props.isMain ? `${styles.header} ${styles.headerMain}`
        : `${styles.header} ${styles.headerWorkspace}`
    return (
        <div className={classNames}>
            <header>
                <div className={styles.icon}><img src={icon} alt="icon"/></div>
                <Nav isMain={props.isMain}/>
            </header>
        </div>
    );
}

export default Header;