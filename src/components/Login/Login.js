import './Login.css';

import Field from "../Field/Field";
import Authorization from "../Authorization/Authorization";
import ValidText from "../../components/ValidText/ValidText";

import { useValidationForm } from '../../hooks/useValidationForm'

function Login({ handleLogin }) {
    const { values, errors, isValid, handleChange } = useValidationForm()

    function handleSubmitForm(evt) {
        evt.preventDefault()
        handleLogin(values)
    }
    return (
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
                name="password"
                onInput={handleChange}
                isValid={!errors.password}
                value={values.password}
            />
            {errors.password && <ValidText type='auth'>{errors.password}</ValidText>}
            <Authorization
                isDisabled={!isValid}
            />
        </form>
    );
}
export default Login;