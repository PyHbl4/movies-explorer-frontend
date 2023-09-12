import searchIcon from '../../images/find.svg';
import FilterCheckbox from '../filterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <form action="post" className="search-form" name="search-form" noValidate>
            <input type='search' placeholder='Фильм' className='search-form__input'></input>
            <button type='submit' className='search-form__submit'>
                <img src={searchIcon} alt='кнопка поиска фильмов' />
            </button>
            <FilterCheckbox />

        </form>
    );
}
export default SearchForm;