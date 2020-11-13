import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import {infoThunk} from "../../../redux/authReducer";


const InfoForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        {createField("ФИО", "fullName", [], Input)}
        {createField("Название компании", "companyName", [], Input)}
        {createField("Расположение", "location", [], Input)}
        {createField("Контактный телефон", "phone", [], Input)}
        {createField("Адрес электронной почты", "email", [], Input)}
        <div>
            <button>Изменить</button>
        </div>
    </form>
}

const InfoReduxForm = reduxForm({
    form: 'info'
})(InfoForm)

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const onSubmit = (formData) => {
        setEditMode(false);
        props.infoThunk(formData)
    }

    return (
        <div>
            {
                !editMode &&
                <div>
                    <h2>Личная информация</h2>
                    <p>ФИО: {props.fullName ? props.fullName : 'не указано'}</p>
                    <p>Название компании: {props.companyName ? props.companyName : 'не указано'}</p>
                    <p>Расположение: {props.location ? props.location : 'не указано'}</p>
                    <p>Контактный телефон: {props.phone ? props.phone : 'не указан'}</p>
                    <p>Адрес электронной почты: {props.email ? props.email : 'не указан'}</p>
                    <button onClick={activateEditMode}>Изменить</button>
                </div>
            }
            {
                editMode &&
                <InfoReduxForm onSubmit={onSubmit} />
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    userName: state.auth.userName,
    userType: state.auth.userType,
    fullName: state.auth.userInfo.fullName,
    companyName: state.auth.userInfo.companyName,
    location: state.auth.userInfo.location,
    phone: state.auth.userInfo.phone,
    email: state.auth.userInfo.email,
})


export default connect(mapStateToProps, {infoThunk})(ProfileInfo);