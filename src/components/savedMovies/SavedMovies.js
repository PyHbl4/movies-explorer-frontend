import SearchForm from '../searchForm/SearchForm';
import Header from '../header/Header';
import FilterCheckbox from '../filterCheckbox/FilterCheckbox';
import Footer from '../footer/Footer';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import cards from '../../utils/constants/savedCards';

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