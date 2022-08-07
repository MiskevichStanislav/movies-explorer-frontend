import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import './Authorization.css';

import ValidText from "../../components/ValidText/ValidText";

import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Authorization({ isDisabled }) {
    const { loaderButton, isFetchError } = useContext(CurrentUserContext)

    const currentPath = useHistory().location.pathname
    const isSignIn = currentPath === '/signin'
    const link = isSignIn ? '/signup' : '/signin'
    const textButton = isSignIn
        ? loaderButton ? 'Вход...' : 'Войти'
        : loaderButton ? 'Регистрация...' : 'Зарегистрироваться'
    
    const authorization = (
        <div className="authorization">
            <p className="authorization__text">
                {isSignIn ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
            </p>
            <Link className="authorization__link" to={link}>
                {isSignIn ? 'Регистрация' : 'Войти'}
            </Link>
        </div>
    )

    return (
        <>
            <button
                type="submit"
                className={isDisabled
                    ? 'form__submit-button form__submit-button_disconnect'
                    : 'form__submit-button'
                }
                disabled={isDisabled}
            >{textButton}</button>
            {isFetchError && <ValidText type='authorization-button'>Что-то пошло не так...</ValidText>}
            {authorization}
        </>
    );
}

export default Authorization;