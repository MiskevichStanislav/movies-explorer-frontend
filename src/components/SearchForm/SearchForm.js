import { useEffect, useState } from 'react';

import './SearchForm.css';

import ValidText from "../../components/ValidText/ValidText";

import LoacalStorage from '../../utils/LocalStorage';
import { useValidationForm } from '../../hooks/useValidationForm'

function SearchForm({ searchFilms, type }) {
    const startValue = { film: '', short: false }

    const { values, isValid, handleChange, setValues, setIsValid } = useValidationForm(startValue)

    const [isSearchError, setIsSearchError] = useState(false)

    const searchQueryLocal = new LoacalStorage(`search-query-${type}`, startValue)

    useEffect(() => {
        const searchQuery = searchQueryLocal.load()

        setValues(searchQuery)
        if (searchQuery) setIsValid(true)
    },[])

    function onChangeCheckbox(event) {
        const newValues = { ...values, short: event.target.checked }

        handleChange(event)
        searchFilms(newValues)
        searchQueryLocal.save(newValues)
    }

    function handleSubmitForm(event) {
        event.preventDefault()
        searchQueryLocal.save(values)


        if (!isValid) {
            setIsSearchError(true)
        } else {
            setIsSearchError(false)
            searchFilms(values)
        }
    }

    return (
        <section className="search" >
            <form className="forms-search" onSubmit={handleSubmitForm} noValidate>
                <input
                    className="forms-search__input"
                    type="text"
                    name="film"
                    placeholder="Фильм"
                    value={values.film}
                    onInput={handleChange}
                    required
                />
                <button className="forms-search__button" type="submit">Найти</button>
            </form>
            {isSearchError && <ValidText type='search'>Нужно ввести ключевое слово</ValidText>}
            <label className="forms-search__label" >
                <input
                    className="forms-search__checkbox"
                    type="checkbox"
                    name='short'
                    checked={values.short}
                    onChange={onChangeCheckbox}
                />
                <div className="forms-search__custom-checkbox">
                    <div className="forms-search__marking"></div>
                </div>
                <p className="forms-search__label-text">Короткометражки</p>
            </label>
        </section >
    );
}

export default SearchForm;