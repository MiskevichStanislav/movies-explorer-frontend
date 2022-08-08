import { useValidationForm } from '../../hooks/useValidationForm'

import './Register.css';

import Authorization from "../Authorization/Authorization";
import Field from "../Field/Field";
import ValidText from "../../components/ValidText/ValidText";
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

import { INPUTS, PATTERNS } from '../../utils/constants'

function Register({ handleRegister }) {
    const { values, errors, isValid, handleChange } = useValidationForm({ name: '', email: '', password: '' })


    function handleSubmitForm(evt) {
        evt.preventDefault()
        handleRegister(values)
    }
    return (
        <AuthLayout>
            <form className="form form-register" onSubmit={handleSubmitForm} name='register' noValidate>
                <Field
                    text='Имя'
                    name={INPUTS.NAME}
                    onInput={handleChange}
                    isValid={!errors[INPUTS.NAME]}
                    value={values[INPUTS.NAME]}
                    pattern={PATTERNS.NAME}
                    title='Имя может состоять из букв, пробелов и -'
                />
                {errors[INPUTS.NAME] && <ValidText type='auth'>{errors[INPUTS.NAME]}</ValidText>}
                <Field
                    text='E-mail'
                    name={INPUTS.EMAIL}
                    type={INPUTS.EMAIL}
                    onInput={handleChange}
                    isValid={!errors[INPUTS.EMAIL]}
                    value={values[INPUTS.EMAIL]}
                />
                {errors[INPUTS.EMAIL] && <ValidText type='auth'>{errors[INPUTS.EMAIL]}</ValidText>}
                <Field
                    text='Пароль'
                    name={INPUTS.PASSWORD}
                    type={INPUTS.PASSWORD}
                    onInput={handleChange}
                    isValid={!errors[INPUTS.PASSWORD]}
                    value={values[INPUTS.PASSWORD]}
                />
                {errors[INPUTS.PASSWORD] && <ValidText type='auth'>{errors[INPUTS.PASSWORD]}</ValidText>}
            <Authorization
                isDisabled={!isValid}
            />
            </form>
            </AuthLayout>
    );
}

export default Register;