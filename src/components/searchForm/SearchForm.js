import searchIcon from '../../images/find.svg';
import FilterCheckbox from '../filterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <form className="search-form" name="search-form">
            <input type='search' placeholder='Фильм' className='search-form__input' required="true"></input>
            <button type='submit' className='search-form__submit'>
                <img src={searchIcon} alt='кнопка поиска фильмов' />
            </button>
            <FilterCheckbox />

        </form>
    );
}
export default SearchForm;