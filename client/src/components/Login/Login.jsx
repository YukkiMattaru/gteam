import React from 'react';
import styles from '../common/FormsControls/FormsControls.module.css';
import {createField, Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../common/FormsControls/validators";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginThunk} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";

const LoginForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        { createField("Логин", "userName", requiredField, Input) }
        { createField("Пароль", "password", requiredField, Input, {type: "password"}) }
        <div>
            <button>Авторизация</button>
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

    return <div>
        <h1>Авторизация</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { loginThunk })(Login)