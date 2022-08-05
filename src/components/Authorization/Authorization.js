import { useHistory, Link } from "react-router-dom";
import './Authorization.css';

function Authorization() {
    const currentPath = useHistory().location.pathname
    const isSignIn = currentPath === '/signin'
    const link = isSignIn ? '/signup' : '/signin'
    const textButton = isSignIn ? 'Войти' : 'Зарегистрироваться'

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
            <button type="submit" className='form__submit-button'>{textButton}</button>
            {authorization}
        </>
    );
}

export default Authorization;