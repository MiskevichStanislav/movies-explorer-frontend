import { useEffect, useState } from 'react';

import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';

import LoacalStorage from '../../utils/LocalStorage';
import { filterFilms } from '../../utils/filterFilms'
import { formatSelectedFilms, setSelect } from '../../utils/select'
import { MESSAGES, CARD_COUNT, SHORT_DURATION } from '../../utils/constants'
import { useCountCard } from '../../hooks/useCountCard'

function Movies({ getAllFilms, getSelectFilms, handleClickSelectButton, setIsShowMenu }) {
    const [allFilms, setAllFilms] = useState(null)
    const [values, setValues] = useState(null)
    const [films, setFilms] = useState([null])
    const [viewFilms, setViewFilms] = useState([null])
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const { countAddFilms, startCountFilms, setParamsCountFilms } = useCountCard(CARD_COUNT)

    const filmsLocal = new LoacalStorage('films')


    useEffect(() => {
        setFilms(filmsLocal.load())
        setParamsCountFilms('all')
        window.addEventListener('resize', setParamsCountFilms)

        return () => {
            window.removeEventListener('resize', setParamsCountFilms)
        }
    }, [])


    useEffect(() => {
        const isNotAllFilms = !allFilms?.all.length

        if (isNotAllFilms && isLoading) {
            Promise.all([getAllFilms(), getSelectFilms()])
                .then(([all, selectes]) => {
                    setAllFilms({
                        all,
                        select: formatSelectedFilms(selectes)
                    })
                })
                .catch(() => {
                    setMessage(MESSAGES.ERROR)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [values])

    useEffect(() => {
        if (values && allFilms) {
            const filtredFilms = filterFilms(allFilms.all, SHORT_DURATION, values)
            const isNotFiltredFilms = !filtredFilms.length
            if (isNotFiltredFilms) setMessage(MESSAGES.NOT_FOUND)

            const filmsWithSelect = setSelect(filtredFilms, allFilms.selectes)
            filmsLocal.save(filmsWithSelect)
            setFilms(filmsWithSelect)
        }
    }, [allFilms, values])


    useEffect(() => {
        if (films) {
            setViewFilms([...films.slice(0, startCountFilms)])
            setMessage('')
        }
        if (!films?.length) setMessage(MESSAGES.NOT_FOUND)
    }, [films, startCountFilms])


    function showMoreFilms() {
        const startIndex = viewFilms.length
        const endIndex = startIndex + countAddFilms

        setViewFilms([...viewFilms, ...films.slice(startIndex, endIndex)])
    }


    function searchFilms(values) {
        setValues(values)
        if (!allFilms) setIsLoading(true)
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
                    {films && films?.length > 3 && films?.length !== viewFilms?.length && <button
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