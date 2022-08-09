import { useValidationForm } from '../../hooks/useValidationForm'

import './Register.css';

import Authorization from "../Authorization/Authorization";
import Field from "../Field/Field";
import ValidText from "../ValidText/ValidText";
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

import { VALIDATION_CONFIGS } from '../../utils/constants'

function Register({ handleRegister }) {
    const { values, errors, isValid, handleChange } = useValidationForm({ name: '', email: '', password: '' }, VALIDATION_CONFIGS.USER_DATA)


    function handleSubmitForm(evt) {
        evt.preventDefault()
        handleRegister(values)
    }
    return (
        <AuthLayout>
            <form className="form form-register" onSubmit={handleSubmitForm} name='register' noValidate>
                <Field
                    text='Имя'
                    name='name'
                    onInput={handleChange}
                    isValid={!errors.name}
                    value={values.name}
                />
                {errors.name && <ValidText type='auth'>{errors.name}</ValidText>}
                <Field
                    text='E-mail'
                    name='email'
                    type='email'
                    onInput={handleChange}
                    isValid={!errors.email}
                    value={values.email}
                />
                {errors.email && <ValidText type='auth'>{errors.email}</ValidText>}
                <Field
                    text='Пароль'
                    name='password'
                    type='password'
                    onInput={handleChange}
                    isValid={!errors.password}
                    value={values.password}
                />
                {errors.password && <ValidText type='auth'>{errors.password}</ValidText>}
            <Authorization
                isDisabled={!isValid}
            />
            </form>
            </AuthLayout>
    );
}

export default Register;