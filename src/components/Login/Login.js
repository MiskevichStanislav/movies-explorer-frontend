import { useState } from "react";
import './Login.css';
import Field from "../Field/Field";
import Authorization from "../Authorization/Authorization";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmitForm(evt) {
        evt.preventDefault()
        console.log(email, password);
    }
    return (
        <form className="form form-login" onSubmit={handleSubmitForm} name='login'>
            <Field
                text='E-mail'
                type='email'
                value={email}
                setValue={setEmail}
            />
            <Field
                text='Пароль'
                type='password'
                value={password}
                setValue={setPassword}
            />
            <Authorization />
        </form>
    );
}
export default Login;