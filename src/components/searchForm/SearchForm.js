import searchIcon from '../../images/find.svg';
import FilterCheckbox from '../filterCheckbox/FilterCheckbox';

function SearchForm(props) {
    function handleSearchInput(e) {
        localStorage.setItem('searchQuery', e.target.value);
        props.setSearchQuery(e.target.value);
    }
    function handleSubmitSearch(e) {
        e.preventDefault();
        props.getCards(props.searchQuery, props.cards, props.shortsOnly, props.moviesSetter);
    }

    function toggleShortsOnly() {
        props.handleCheckbox(props.searchQuery, props.cards, props.filteredMovies, props.moviesSetter, props.shortsOnly, props.shortsSetter);
    }
    return (
        <form className="search-form" name="search-form" onSubmit={handleSubmitSearch}>
            <input type='search'
                value={props.searchQuery}
                onChange={handleSearchInput}
                placeholder='Фильм'
                className='search-form__input'
                required={true}>
            </input>
            <button type='submit' className='search-form__submit' disabled={!(props.searchQuery !== '')}>
                <img src={searchIcon} alt='кнопка поиска фильмов' />
            </button>
            <FilterCheckbox cards={props.cards} toggleCheckbox={toggleShortsOnly} shortsOnly={props.shortsOnly} />
        </form>
    );
}
export default SearchForm;