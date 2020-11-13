import React from 'react';
import {connect} from "react-redux";
import styles from "./ProfileCertificates.module.css";

const ProfileCertificates = (props) => {
    return (
        <div>
            <div>
                <h2>Действующие зеленые сертификаты</h2>
                <div>
                    <div>
                        <p>Зеленый сертификат №123-7213</p>
                        <p>Выдан: 13.11.2020</p>
                        <p>Срок действия: до 13.11.2023</p>
                    </div>
                    <br/>
                    <div>
                        <p>Зеленый сертификат №123-7214</p>
                        <p>Выдан: 13.11.2020</p>
                        <p>Срок действия: до 13.11.2023</p>
                    </div>
                    <br/>
                    <div>
                        <p>Зеленый сертификат №123-7215</p>
                        <p>Выдан: 13.11.2020</p>
                        <p>Срок действия: до 13.11.2023</p>
                    </div>
                </div>
            </div>
            <div>
                <h3>Проданные зеленые сертификаты</h3>
                <div>
                    <div>
                        <p>Зеленый сертификат №123-7216</p>
                        <p>Выдан: 13.11.2020</p>
                        <p>Продан: 14.11.2020</p>
                        <p>Покупатель: НПК Дедал</p>
                    </div>
                </div>
                <h3>Погашенные зеленые сертификаты</h3>
                <div>
                    <div>
                        <p>Зеленый сертификат №123-7217</p>
                        <p>Выдан: 13.11.2017</p>
                        <p>Погашен: 14.11.2020</p>
                        <p>Комментарий: Истекший срок годности</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps, {})(ProfileCertificates)