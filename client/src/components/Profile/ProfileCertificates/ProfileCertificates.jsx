import React from 'react';
import {connect} from "react-redux";
import styles from "./ProfileCertificates.module.css";
import moment from "moment";
import {deleteCertificateThunk} from "../../../redux/certificatesReducer";

const ProfileCertificates = (props) => {

    let styles = {
        "marginBottom": "10px",
        "padding": "5px 15px",
        "backgroundColor": "lightgreen",
        "boxSizing": "borderBox"
    }

    let deleteCertificate = (id) => {
        let result = window.confirm(`Вы уверены, что хотите погасить сертификат №${id}?`)
        if (result) {
            props.deleteCertificateThunk(id);
        }
    }

    return (
        <div>
            <h2>Действующие зеленые сертификаты</h2>
            {props.certificates.length ? props.certificates.map(certificate => {
                return <div style={styles}>
                    <p>{`Зеленый сертификат №${certificate._id}`}</p>
                    <p>{`Выдан: ${moment.parseZone(certificate.date).format('DD-MM-YYYY')}`}</p>
                    <p>Срок действия: до {`${moment.parseZone(certificate.dateFrom).format('DD-MM')}-${Number(moment.parseZone(certificate.dateFrom).format('YYYY'))+3}`}</p>
                    <button onClick={() => deleteCertificate(certificate._id)}>Погасить сертификат</button>
                </div>
            }) : "Действующих сертификатов нет"}
        </div>
    )
}

const mapStateToProps = (state) => ({
    certificates: state.certificates,
})


export default connect(mapStateToProps, {deleteCertificateThunk})(ProfileCertificates)

/* <div>
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
        </div> */