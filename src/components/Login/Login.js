import './Login.css';

import Field from "../Field/Field";
import Authorization from "../Authorization/Authorization";
import ValidText from "../ValidText/ValidText";
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

import { useValidationForm } from '../../hooks/useValidationForm'
import { VALIDATION_CONFIGS } from '../../utils/constants'

function Login({ handleLogin }) {
    const { values, errors, isValid, handleChange } = useValidationForm({ email: '', password: '' }, VALIDATION_CONFIGS.LOGIN)

    function handleSubmitForm(evt) {
        evt.preventDefault()
        handleLogin(values)
    }
    return (
        <AuthLayout>
            <form className="form form-login" onSubmit={handleSubmitForm} name='login'>
                <Field
                    text='E-mail'
                    type='email'
                    name='email'
                    onInput={handleChange}
                    isValid={!errors.email}
                    value={values.email}
                />
                {errors.email && <ValidText type='auth'>{errors.email}</ValidText>}
                <Field
                    text='Пароль'
                    type='password'
                    name='password'
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
export default Login;