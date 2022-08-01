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
                    ></button>
                </div>
                <p className="card-movies__length">1ч 47м</p>
            </div>
            <div className="card-movies__image"></div>
           
        </li>
    );
}

export default MoviesCard;