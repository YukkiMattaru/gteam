import React from 'react';
import {connect} from "react-redux";
import styles from "./ProfileCertificates.module.css";
import moment from "moment";
import {deleteCertificateThunk, sellCertificateThunk, unsellCertificateThunk} from "../../../redux/certificatesReducer";

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

    let sellCertificate = (id) => {
        let result = window.confirm(`Вы уверены, что хотите выставить сертификат №${id} на продажу?`)
        if (result) {
            props.sellCertificateThunk(id);
        }
    }

    let unsellCertificate = (id) => {
        let result = window.confirm(`Вы уверены, что хотите убрать сертификат №${id} с продажи?`)
        if (result) {
            props.unsellCertificateThunk(id);
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
                    {!certificate.toSell ? <button onClick={() => sellCertificate(certificate._id)}>Выставить сертификат на продажу</button>
                    : <button onClick={() => unsellCertificate(certificate._id)}>Снять сертификат с продажи</button>}
                </div>
            }) : "Действующих сертификатов нет"}
        </div>
    )
}

const mapStateToProps = (state) => ({
    certificates: state.certificates,
})


export default connect(mapStateToProps, {deleteCertificateThunk, sellCertificateThunk, unsellCertificateThunk})(ProfileCertificates)