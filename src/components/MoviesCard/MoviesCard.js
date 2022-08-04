import './MoviesCard.css';
import cardFilm from '../../images/film.jpg';

function MoviesCard() {
    const isFavofiteFilm = true
    return (
        <li className="card-movies">
             <div className="card-movies__description">
                <div className="card-movies__rows">
                    <p className="card-movies__name">33 слова о дизайне</p>
                    <button
                        className={
                            isFavofiteFilm
                                ? "card-movies__select card-movies__select_active"
                                : "card-movies__select"
                        }
                        type="button"
                    ></button>
                </div>
                <p className="card-movies__length">1ч 47м</p>
            </div>
            <img className="card-movies__image"
                src={cardFilm}
                alt="карточки фильмов" />
           
        </li>
    );
}

export default MoviesCard;