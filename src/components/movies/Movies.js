import SearchForm from '../searchForm/SearchForm';
import Header from '../header/Header';
import FilterCheckbox from '../filterCheckbox/FilterCheckbox';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import Footer from '../footer/Footer';
import cards from '../../utils/constants/cards';

function Movies(props) {
    return (
        <>
            <Header loggedIn={props.loggedIn} handleToggleMenu={props.handleToggleMenu} logIn={props.logIn} />
            <main className="main movies-page">
                <section className='app-section search-section'>
                    <SearchForm />
                    <FilterCheckbox />
                </section>
                <MoviesCardList cards={cards} />
            </main>
            <Footer />
        </>
    );
}
export default Movies;