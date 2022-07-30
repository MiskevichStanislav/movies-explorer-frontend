import { useHistory } from 'react-router-dom'
import './NotFound_404.css';

function Login() {
    const history = useHistory()

    function handleClick() {
        history.goBack();
    }
    return (
        <div className="error-404">
            <div className="error-404__text">
            <p className="error-404__title">404</p>
            <p className="error-404__subtitle">Страница не найдена</p>
            </div>
            <button
                className="error-404__go-back"
                onClick={handleClick}>Назад
            </button>
        </div>
    );
}

export default Login;