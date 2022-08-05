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
                        <p className="about-me__text">Я родился в сибирском городке Томск, закончил бакалавриат строительного факультета,закончил магистратуру строительного факультета Томского Государственного Архитектурно-Строительного Университета. Я люблю путешествовать,люблю много снимать фото и видео красивых локаций, а ещё увлекаюсь бегом и занимаюсь футболом. Ровно 9 месяцев назад, решил дополнить свою жизнь совершенно новой для меня сферой деятельности и ни разу не разочаровался. После того, как начал проходить курс по веб-разработке, решил пробовать себя во фрилансе.
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