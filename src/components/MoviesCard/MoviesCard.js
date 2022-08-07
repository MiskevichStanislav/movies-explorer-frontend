import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import './MoviesCard.css';

import { formatDuration } from '../../utils/formatDuration'

function MoviesCard({ film, handleClickSelectButton }) {
    const [filmId, setFilmId] = useState('')

    const currentPath = useHistory().location.pathname
    const isSavedMovies = currentPath === '/saved-movies'

    const baseUrl = 'https://api.nomoreparties.co'
    const imageUrl = film.thumbnail || `${baseUrl}/${film.image.formats.thumbnail.url}`

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
                image: baseUrl + film.image.url,
                trailerLink: film.trailerLink,
                nameRU: film.nameRU,
                nameEN: film.nameEN || '-',
                thumbnail: baseUrl + film.image.formats.thumbnail.url,
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
            <a className='card-movies__trailer-link' href={film.trailerLink} target="_blank" rel="noreferrer">
                <img
                    className="card-movies__image"
                    src={imageUrl}
                    alt={film.nameRU}
                />
            </a>

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
            <div className="card-movies__image"></div>
           
        </li>
    );
}

export default MoviesCard;