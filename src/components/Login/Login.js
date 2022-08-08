import './Login.css';

import Field from "../Field/Field";
import Authorization from "../Authorization/Authorization";
import ValidText from "../../components/ValidText/ValidText";
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

import { useValidationForm } from '../../hooks/useValidationForm'
import { INPUTS } from '../../utils/constants'

function Login({ handleLogin }) {
    const { values, errors, isValid, handleChange } = useValidationForm({ email: '', password: '' })

    function handleSubmitForm(evt) {
        evt.preventDefault()
        handleLogin(values)
    }
    return (
        <AuthLayout>
            <form className="form form-login" onSubmit={handleSubmitForm} name='login'>
                <Field
                    text='E-mail'
                    type={INPUTS.EMAIL}
                    name={INPUTS.EMAIL}
                    onInput={handleChange}
                    isValid={!errors[INPUTS.EMAIL]}
                    value={values[INPUTS.EMAIL]}
                />
                {errors[INPUTS.EMAIL] && <ValidText type='auth'>{errors[INPUTS.EMAIL]}</ValidText>}
                <Field
                    text='Пароль'
                    type={INPUTS.PASSWORD}
                    name={INPUTS.PASSWORD}
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
export default Login;