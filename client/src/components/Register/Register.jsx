import React from 'react';
import styles from '../common/FormsControls/FormsControls.module.css';
import {createField, Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../common/FormsControls/validators";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {registerThunk} from "../../redux/registerReducer";

const RegisterForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        { createField("Логин", "userName", requiredField, Input) }
        { createField("Пароль", "password", requiredField, Input, {type: "password"}) }
        <Field name="userType" component="select">
            <option />
            <option value="manufacturer">Производитель</option>
            <option value="trader">Покупатель/продавец</option>
        </Field>
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
        props.registerThunk(formData.userName, formData.password, formData.userType)
    }

    return <div>
        <h1>Регистрация</h1>
        <RegisterReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({ })

export default connect(mapStateToProps, { registerThunk })(Register)