import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__container">
                <p className="footer__text">Дипломный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__wrapper">
                    <p className="footer__copyright">© 2022.Разработал Мискевич Станислав</p>
                    <ul className="footer__links">
                        <li><a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a></li>
                        <li><a className="footer__link" href="https://github.com/MiskevichStanislav">Github</a></li>
                        <li><a className="footer__link" href="https://vk.com/miskevichstasik">Вконтакте</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;