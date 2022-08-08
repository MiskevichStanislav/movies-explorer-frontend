import { useEffect, useState } from 'react';

import './SavedMovies.css';

import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';

import { filterFilms } from '../../utils/filterFilms'
import { MESSAGES, SHORT_DURATION } from '../../utils/constants'

function SavedMovies({ requestSelectFilms, handleClickSelectButton, setIsShowMenu, searchQuerySavedMoviesLocal }) {
    const [selectedFilms, setSelectedFilms] = useState(null)
    const [displayedFilms, setDisplayedFilms] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getSelectFilms()
    }, [])
        
    function getSelectFilms() {
        startLoader()
        requestSelectFilms()
            .then(films => {
                setAllFilms(films)
                hideErrorMessage()
            })
            .catch(() => {
                showErrorMessage(MESSAGES.ERROR)
            })
            .finally(() => {
                stopLoader()
            })
    }

    function searchFilms(values) {
        const films = filterFilms(selectedFilms, SHORT_DURATION, values)
        setDisplayedFilms(films)

        films?.length ? hideErrorMessage() : showErrorMessage(MESSAGES.NOT_FOUND)
    }


function handleDeleteFilm(filmId) {
    handleClickSelectButton(filmId)
        .then(() => setAllFilms(selectedFilms.filter(film => film._id !== filmId)))
}

function setAllFilms(films) {
    setSelectedFilms(films)
    setDisplayedFilms(films)
}

function startLoader() {
    setIsLoading(true)
}

function stopLoader() {
    setIsLoading(false)
}

function showErrorMessage(message) {
    setErrorMessage(message)
    }
    
function hideErrorMessage() {
    setErrorMessage(null)
}


return (
    <HeaderAndFooterLayout
        setIsShowMenu={setIsShowMenu}
    >
        <div className="saved">
            <div className="container movies__container">
                <SearchForm
                    searchFilms={searchFilms}
                    searchQueryLocal={searchQuerySavedMoviesLocal}
                />
                <MoviesCardList
                    films={displayedFilms}
                    isLoading={isLoading}
                    message={errorMessage}
                    handleClickSelectButton={handleDeleteFilm}
                />
            </div>
        </div>
    </HeaderAndFooterLayout>
);
}

export default SavedMovies;