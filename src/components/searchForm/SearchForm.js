import searchIcon from '../../images/find.svg';
import FilterCheckbox from '../filterCheckbox/FilterCheckbox';

function SearchForm(props) {
    function handleSearchInput(e) {
        if (!props.isSavedPage) {
            localStorage.setItem('searchQuery', e.target.value);
        }
        props.setSearchQuery(e.target.value);
    }
    function handleSubmitSearch(e) {
        e.preventDefault();
        props.getCards(props.searchQuery, props.shortsOnly);
    }

    async function toggleShortsOnly() {
        await props.handleCheckbox(props.searchQuery, props.cards, props.moviesSetter, props.shortsOnly, props.shortsSetter);
        if (!props.isSavedPage) {
            localStorage.setItem('shortsOnly', !props.shortsOnly);
        }
    }
    return (
        <form className="search-form" name="search-form" onSubmit={handleSubmitSearch}>
            <input type='search'
                value={props.searchQuery}
                onChange={handleSearchInput}
                placeholder='Фильм'
                className='search-form__input'>
            </input>
            <button type='submit' className='search-form__submit'>
                <img src={searchIcon} alt='кнопка поиска фильмов' />
            </button>
            <FilterCheckbox cards={props.cards} toggleCheckbox={toggleShortsOnly} shortsOnly={props.shortsOnly} />
        </form>
    );
}
export default SearchForm;