import { useEffect, useState } from 'react';

import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';

import { filterFilms } from '../../utils/filterFilms'
import { formatSelectedFilms, setSelect } from '../../utils/select'
import { MESSAGES, CARD_COUNT, CARD_BRAKEPOINT, SHORT_DURATION } from '../../utils/constants'
import { useCountCard } from '../../hooks/useCountCard'

function Movies({ requestAllFilms, requestSelectFilms, handleClickSelectButton, setIsShowMenu, filmsLocal, searchQueryMoviesLocal }) {
    const [allFilms, setAllFilms] = useState(null)
    const [selectedFilms, setSelectedFilms] = useState(null)
    const [filtredFilms, setFiltredFilms] = useState(null)
    const [displayedFilms, setDisplayedFilms] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [queryValues, setQueryValues] = useState(null)

    const { countAddFilms, startCountFilms, setParamsCountFilms } = useCountCard(CARD_COUNT, CARD_BRAKEPOINT)


    useEffect(() => {
        getSelectFilms()
        setCountViewFilms()
        addResizeEvent()
        return () => removeResizeEvent()
    }, [])


    useEffect(() => {
        if (selectedFilms && !isLoading) {
            loadFilmsLocal()
        }
    }, [selectedFilms, isLoading])

    useEffect(() => {
        if (allFilms?.length && queryValues) {
            const films = filterFilms(allFilms, SHORT_DURATION, queryValues)
            saveFilmsLocal(films)
            setFiltredFilms(films)

            films?.length ? hideErrorMessage() : showErrorMessage(MESSAGES.NOT_FOUND)
        }
    }, [allFilms, queryValues])

    useEffect(() => {
        if (filtredFilms?.length) {
            const films = setSelect(filtredFilms, selectedFilms)
            setDisplayedFilms([...films.slice(0, startCountFilms)])
        }
    }, [filtredFilms, startCountFilms])

    function getSelectFilms() {
        startLoader()
        requestSelectFilms()
            .then(films => {
                setSelectedFilms(formatSelectedFilms(films))
                hideErrorMessage()
            })
            .catch(() => {
                showErrorMessage(MESSAGES.ERROR)
            })
            .finally(() => {
                stopLoader()
            })
    }

    function getAllFilms() {
        startLoader()
        requestAllFilms()
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
        if (!allFilms?.length) getAllFilms()
        setQueryValues(values)
    }

    function startLoader() {
        setIsLoading(true)
    }

    function stopLoader() {
        setIsLoading(false)
    }

    function showMoreFilms() {
        const startIndex = displayedFilms.length
        const endIndex = startIndex + countAddFilms

        setDisplayedFilms([...displayedFilms, ...filtredFilms.slice(startIndex, endIndex)])
    }

    function saveFilmsLocal(films) {
        filmsLocal.save(films)
    }

    function loadFilmsLocal() {
        const localFilms = filmsLocal.load()
        setFiltredFilms(localFilms)
    }

    function addResizeEvent() {
        window.addEventListener('resize', setParamsCountFilms)
    }

    function removeResizeEvent() {
        window.removeEventListener('resize', setParamsCountFilms)
    }

    function setCountViewFilms() {
        setParamsCountFilms('all')
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
            <div className="movies">
                <div className="container movies__container">
                    <SearchForm
                        searchFilms={searchFilms}
                        searchQueryLocal={searchQueryMoviesLocal}
                        type='movies'
                    />
                    <MoviesCardList
                        films={displayedFilms}
                        isLoading={isLoading}
                        message={errorMessage}
                        handleClickSelectButton={handleClickSelectButton}
                    />
                    {filtredFilms
                        && filtredFilms?.length > 3
                        && filtredFilms?.length !== displayedFilms?.length
                        && <button
                            className="movies__next-button"
                            type='button'
                            onClick={() => showMoreFilms()}
                        >Ещё</button>}

                </div>
            </div >
        </HeaderAndFooterLayout>
    );
}

export default Movies;