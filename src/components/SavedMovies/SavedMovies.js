import { useEffect, useState } from 'react';

import './SavedMovies.css';

import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';

import { filterFilms } from '../../utils/filterFilms'

function SavedMovies({ getSelectFilms, handleClickSelectButton }) {
    const [films, setFilms] = useState([])
    const [viewFilms, setViewFilms] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        getFilms()
    }, [])

    useEffect(() => {
        hideNotFoundMessage()
        if (!films.length) {
            showNotFoundMessage()
        }
    }, [films])

    function getFilms() {
        setIsLoading(true)
        getSelectFilms()
            .then(films => {
                setFilms(films)
                setViewFilms(films)
            })
            .catch(() => {
                setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function searchFilms(values) {
        const filterFilmsList = filterFilms(films, values)
        hideNotFoundMessage()
        setViewFilms(filterFilmsList)
        if (!filterFilmsList.length) {
            showNotFoundMessage()
        }
    }

    function deleteFilm(filmId) {
        handleClickSelectButton(filmId)
            .then(() => {
                setFilms(films.filter(film => film._id !== filmId))
                setViewFilms(films.filter(film => film._id !== filmId))
            })
    }
    function showNotFoundMessage() {
        setMessage('Ничего не найдено')
        setViewFilms([])
    }

    function hideNotFoundMessage() {
        setMessage('')

    }


    return (
        <div className="saved">
            <div className="container movies__container">
                <SearchForm
                    type="saved-movies"
                    searchFilms={searchFilms}
                />
                <MoviesCardList
                    films={viewFilms}
                    isLoading={isLoading}
                    message={message}
                    handleClickSelectButton={deleteFilm}
                />
            </div>
        </div>
    );
}

export default SavedMovies;