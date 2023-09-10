import searchIcon from '../../images/find.svg';

function SearchForm() {
    return (
        <form action="post" className="search-form" name="search-form" noValidate>
            <input type='search' placeholder='Фильм' className='search-form__input'></input>
            <button type='submit' className='search-form__submit'>
                <img src={searchIcon} alt='кнопка поиска фильмов' />
            </button>
        </form>
    );
}
export default SearchForm;