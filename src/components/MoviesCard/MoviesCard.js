import './MoviesCard.css';

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
                src="https://s4.afisha.ru/mediastorage/44/9e/c9773f790a4e490ebc0921569e44.jpg"
                alt="карточки фильмов" />
           
        </li>
    );
}

export default MoviesCard;