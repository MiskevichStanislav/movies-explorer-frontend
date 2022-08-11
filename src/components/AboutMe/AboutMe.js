import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio'
import photo from '../../images/my_photo.jpg'

function AboutMe() {
    return (
        <section className="about-me" id='about-me'>
            <div className="container about-me__container">
                <h3 className="title about-me__title">Студент</h3>
                <div className="about-me__wrapper">
                    <div className="about-me__description">
                        <p className="about-me__name">Станислав</p>
                        <p className="about-me__profession">Фронтенд-разработчик, 27 лет</p>
                        <p className="about-me__text">Я родился в сибирском городке Томск, где окончил бакалавриат и магистратуру строительного факультета Томского Государственного Архитектурно-Строительного Университета. Мне нравится путешествовать, фотографировать и снимать на видео красивые места России. Также я увлекаюсь бегом и играю в футбол. А 9 месяцев назад я решил дополнить свою жизнь совершенно новой для себя сферой деятельности, о чем ни разу не пожалел. Теперь после прохождения курс по веб-разработке, я начал пробовать свои силы во фрилансе.
                        </p>
                        <ul className="about-me__links">
                            <li><a className="about-me__link" href="https://vk.com/miskevichstasik" target="_blank" rel="noreferrer">Вконтакте</a></li>
                            <li><a className="about-me__link" href="https://github.com/MiskevichStanislav" target="_blank" rel="noreferrer">Github</a></li>
                        </ul>
                    </div>
                    <img className="about-me__photo" src={photo} alt="Фото для портфолио" />
                </div>
                <Portfolio />
            </div>
        </section>
    );
}

export default AboutMe;