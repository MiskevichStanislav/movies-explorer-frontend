import { useHistory, Link } from "react-router-dom";
import './AuthLayout.css';
import Logo from "../../components/Logo/Logo";



function AuthLayout({ children }) {
    const currentPath = useHistory().location.pathname
    const isSignIn = currentPath === '/signin'
    const link = isSignIn ? '/signup' : '/signin'

    const title = (
        <h1 className='auth__title'>
            {isSignIn ? 'Рады видеть!' : 'Добро пожаловать!'}
        </h1>
    )

    const topic = (
        <div className="auth__topic">
            <p className="auth__topic-text">
                {isSignIn ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
            </p>
            <Link className="auth__topic-link" to={link}>
                {isSignIn ? 'Регистрация' : 'Войти'}
            </Link>
        </div>
    )

    return (
        <>
            <main className="auth">
                <div className="auth__logo">
                    <Logo />
                </div>
                {title}
                {children}
                {topic}
            </main>
        </>

    );
}

export default AuthLayout;