import { useState } from "react";
import './Register.css';
import Field from "../Field/Field";

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmitForm(evt) {
        evt.preventDefault()
        console.log(name, email, password);
    }
    return (
        <form className="form" onSubmit={handleSubmitForm} name='register'>
            <Field
                text='Имя'
                value={name}
                setValue={setName}
            />
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
            <button className='authform__submit-button'>Зарегистрироваться</button>
        </form>
    );
}

export default Register;