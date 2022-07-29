import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__item"><a className="portfolio__link" href="https://miskevichstanislav.github.io/how-to-learn/">Статичный сайт</a></li>
                <li className="portfolio__item"><a className="portfolio__link" href="https://miskevichstanislav.github.io/russian-travel/">Адаптивный сайт</a></li>
                <li className="portfolio__item"><a className="portfolio__link" href="https://msprod.nomoredomains.xyz/">Одностраничное приложение</a></li>
            </ul>
        </section>
    );
}

export default Portfolio;