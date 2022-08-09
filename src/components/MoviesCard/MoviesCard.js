import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import './MoviesCard.css';

import { formatDuration } from '../../utils/formatDuration'
import { BASE_URL, PAGES } from '../../utils/constants'

function MoviesCard({ film, handleClickSelectButton }) {
    const [filmId, setFilmId] = useState('')
    const isSavedMovies = useHistory().location.pathname === PAGES.SAVED_MOVIES
    const imageUrl = film.thumbnail || `${BASE_URL}/${film.image.formats.thumbnail.url}`

    useEffect(() => {
        const filmId = film._id
        if (filmId) setFilmId(filmId)
    }, [])

    function clickSelectButton() {
        if (isSavedMovies) {
            handleClickSelectButton(filmId)
        } else {
            const filmData = {
                country: film.country || '-',
                director: film.director,
                duration: film.duration,
                year: film.year,
                description: film.description,
                image: BASE_URL + film.image.url,
                trailerLink: film.trailerLink,
                nameRU: film.nameRU,
                nameEN: film.nameEN || '-',
                thumbnail: BASE_URL + film.image.formats.thumbnail.url,
                movieId: film.id,
            }

            handleClickSelectButton(filmId, filmData)
                .then(film => {
                    setFilmId(filmId ? '' : film._id)
                })
        }
    }

    return (
        <li className="card-movies">

            <div className="card-movies__description">
                <div className="card-movies__rows">
                    <p className="card-movies__name">{film.nameRU}</p>
                    <button
                        className={
                            filmId
                                ? "card-movies__select card-movies__select_active"
                                : "card-movies__select"
                        }
                        type="button"
                        onClick={clickSelectButton}
                    ></button>
                </div>
                <p className="card-movies__length">{formatDuration(film.duration)}</p>
            </div>
            <a className='card-movies__trailer-link' href={film.trailerLink} target="_blank" rel="noreferrer">
                <img
                    className="card-movies__image"
                    src={imageUrl}
                    alt={film.nameRU}
                />
            </a>
        </li>
    );
}

export default MoviesCard;