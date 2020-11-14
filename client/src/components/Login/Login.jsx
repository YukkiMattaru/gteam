import React from 'react';
import {createField, Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../common/FormsControls/validators";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginThunk} from "../../redux/authReducer";
import styles from "./Login.module.css"
import {Redirect} from "react-router-dom";

const LoginForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        { createField("Логин *", "userName", requiredField, Input) }
        { createField("Пароль *", "password", requiredField, Input, {type: "password"}) }
        <div>
            <button>Войти в личный кабинет</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({
    form: 'login'
}) (LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunk(formData.userName, formData.password)
    }

    if (props.isAuth) {
        return <Redirect to='/profile' />
    }

    return <div className={styles.login}>
        <h1>Авторизация</h1>
        <LoginReduxForm className={styles.form} onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { loginThunk })(Login)