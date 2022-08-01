import './SearchForm.css';

function SearchForm({ isShort, setIsShort, searchQuery, setSearchQuery, searchFilms }) {
    return (
        <section className="search" >
            <div className="container search__container">
                <form className="forms-search" onSubmit={searchFilms}>
                    <input
                        className="forms-search__input"
                        type="text"
                        placeholder='Фильм'
                        value={searchQuery}
                        onInput={e => setSearchQuery(e.target.value)}
                    />
                    <button className="forms-search__button">Найти</button>
                </form>

                <label className="forms-search__label" >
                    <input
                        className="forms-search__checkbox"
                        type="checkbox"
                        checked={isShort}
                        onChange={() => setIsShort(!isShort)}
                    />
                    <div className="forms-search__custom-checkbox">
                        <div className="forms-search__marking"></div>
                    </div>
                    <p className="forms-search__label-text">Короткометражки</p>
                </label>

            </div>
        </section >
    );
}

export default SearchForm;