import React from 'react';
import {Field} from 'redux-form';
import styles from './FormsControls.module.css';

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return <div className={styles.formControl + ' ' + (hasError ? styles.error : "")}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder, name, validators, component, props) => {
    return <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props} />
    </div>
}