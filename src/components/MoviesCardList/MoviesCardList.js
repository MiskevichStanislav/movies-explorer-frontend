import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ films, isLoading, message, handleClickSelectButton }) {
    return (
        <>
            {message
                ? <p className='movies__alarm'>{message}</p>
                : <ul className="movies-list">
                    {isLoading
                        ? <Preloader />
                        : films?.map(film => {
                            return <MoviesCard
                                film={film}
                                key={film.id || film.movieId}
                                handleClickSelectButton={handleClickSelectButton}
                            />
                        })
                    }
                </ul>
            }
        </>
    );
}

export default MoviesCardList;