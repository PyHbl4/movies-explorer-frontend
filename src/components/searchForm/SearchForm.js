import { useState, useEffect } from "react";
import searchIcon from '../../images/find.svg';
import FilterCheckbox from '../filterCheckbox/FilterCheckbox';

function SearchForm(props) {
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        localStorage.searchQuery ? setSearchQuery(localStorage.searchQuery) : setSearchQuery('');
    }, []);
    function handleSearchInput(e) {
        localStorage.setItem('searchQuery', e.target.value);
        setSearchQuery(e.target.value);
    }
    function handleSubmitSearch(e) {
        e.preventDefault();
        props.getCards(searchQuery);
    } 

    function toggleShortsOnly() {
        props.handleCheckbox(searchQuery);
    }
    return (
        <form className="search-form" name="search-form" onSubmit={handleSubmitSearch}>
            <input type='search'
                value={searchQuery}
                onChange={handleSearchInput}
                placeholder='Фильм'
                className='search-form__input'
                required={true}>
            </input>
            <button type='submit' className='search-form__submit'>
                <img src={searchIcon} alt='кнопка поиска фильмов' />
            </button>
            <FilterCheckbox cards={props.cards} toggleCheckbox={toggleShortsOnly} shortsOnly={props.shortsOnly} />
        </form>
    );
}
export default SearchForm;