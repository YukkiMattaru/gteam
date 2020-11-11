import React from 'react';
import styles from './Main.module.css'
import {NavLink} from "react-router-dom";

const Main = () => {
    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <h1>Сертификация производителей зеленой энергии</h1>
            </div>
            <div className={styles.subtitle}>
                <h2>Центральный эмитент &laquo;зеленых&raquo; сертификатов<br/> в Российской Федерации </h2>
            </div>
            <div className={styles.contactUsDescription}>
                <p>Если Вы производите &laquo;чистую&raquo; энергию и хотите заявить о себе, зарегистрируйтесь в системе учета и свяжитесь с нами</p>
            </div>
            <div className={styles.mainRegistration}>
                <NavLink exact to={'/register'}>Регистрация</NavLink>
            </div>
        </div>
    )
}

export default Main;
