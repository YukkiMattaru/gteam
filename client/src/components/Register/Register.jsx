import React from 'react';
import styles from '../common/FormsControls/FormsControls.module.css';
import {createField, Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../common/FormsControls/validators";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {registerThunk} from "../../redux/registerReducer";
import {Redirect} from "react-router-dom";

const RegisterForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        { createField("Логин*", "userName", requiredField, Input) }
        { createField("Пароль*", "password", requiredField, Input, {type: "password"}) }
        <p>Укажите, кем вы являетесь*:</p>
        <Field name="userType" component="select">
            <option />
            <option value="manufacturer">Производитель</option>
            <option value="trader">Покупатель/продавец</option>
        </Field>
        <p>Личные данные</p>
        { createField("Полное имя", "fullName", [], Input) }
        { createField("Название компании", "companyName", [], Input) }
        { createField("Расположение", "location", [], Input) }
        { createField("Контактный телефон", "phone", [], Input) }
        { createField("Электронная почта", "email", [], Input) }
        <div>
            <button>Регистрация</button>
        </div>
    </form>
}

const RegisterReduxForm = reduxForm({
    form: 'register'
}) (RegisterForm)

const Register = (props) => {
    const onSubmit = (formData) => {
        props.registerThunk(formData)
    }

    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }

    return <div>
        <h1>Регистрация</h1>
        <RegisterReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { registerThunk })(Register)