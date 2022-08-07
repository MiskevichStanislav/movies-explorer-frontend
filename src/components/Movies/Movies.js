import { useEffect, useState } from 'react';

import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';

import LoacalStorage from '../../utils/LocalStorage';
import { filterFilms } from '../../utils/filterFilms'
import { useCountCard } from '../../hooks/useCountCard'

function Movies({ getAllFilms, getSelectFilms, handleClickSelectButton, setIsShowMenu }) {

    const [films, setFilms] = useState([])

    const [viewFilms, setViewFilms] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const [message, setMessage] = useState('')

    const { countFilms, startCountFilms, setParamsCountFilms } = useCountCard(3, 12)


    const filmsLocal = new LoacalStorage('films')


    useEffect(() => {
        setFilmsWhitSelect(filmsLocal.load())
        setParamsCountFilms('all')
        window.addEventListener('resize', setParamsCountFilms)

        return () => {
            window.removeEventListener('resize', setParamsCountFilms)
        }
    }, [])

    useEffect(() => {
        setViewFilms([...films.slice(0, startCountFilms)])
    }, [films, startCountFilms])


    function showMoreFilms() {
        const startIndex = viewFilms.length
        const endIndex = startIndex + countFilms

        setViewFilms([...viewFilms, ...films.slice(startIndex, endIndex)])
    }

    function searchFilms(values) {
        setIsLoading(true)
        setMessage('')

        getAllFilms()
            .then(allFilms => {
                const filterFilmsList = filterFilms(allFilms, values)

                if (!filterFilmsList.length) {
                    setMessage('Ничего не найдено')
                    setViewFilms([])
                }

                setFilmsWhitSelect(filterFilmsList)
                filmsLocal.save(filterFilmsList)
            })
            .catch(() => {
                setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function setFilmsWhitSelect(films) {
        getSelectFilms()
            .then(savedFilms => {
                const selectFilms = savedFilms.map(film => ({
                    movieId: film.movieId,
                    _id: film._id
                }))

                const filmsWithSelect = films.map(film => {
                    let isSelectFilm = false
                    let _id = ''

                    selectFilms.forEach(selectFilm => {
                        isSelectFilm = film.id === selectFilm.movieId
                        if (isSelectFilm) _id = selectFilm._id
                    })

                    return { ...film, _id }
                })

                setFilms(filmsWithSelect)
            })
    }



    return (
        <HeaderAndFooterLayout
            setIsShowMenu={setIsShowMenu}
        >
            <div className="movies">
                <div className="container movies__container">
                    <SearchForm
                        searchFilms={searchFilms}
                        type='movies'
                    />
                    <MoviesCardList
                        films={viewFilms}
                        isLoading={isLoading}
                        message={message}
                        handleClickSelectButton={handleClickSelectButton}
                    />
                    {films.length > 3 && films.length !== viewFilms.length && <button
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