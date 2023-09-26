import SearchForm from '../searchForm/SearchForm';
import Header from '../header/Header';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import NoResults from '../noResults/NoResults';
import Footer from '../footer/Footer';

function Movies(props) {
    return (
        <>
            <Header loggedIn={props.loggedIn} handleToggleMenu={props.handleToggleMenu} logIn={props.logIn} />
            <main className="main movies-page">
                <section className='app-section search-section'>
                    <SearchForm
                        cards={props.movies}
                        getCards={props.getMovies}
                        handleCheckbox={props.shortsToggler}
                        shortsOnly={props.shortsOnly} />
                </section>
                {props.movies.length > 0
                    ?
                    <MoviesCardList
                        cards={props.movies}
                        savedMovies={props.savedMovies}
                        isSavedPage={false}
                        handleSaveMovie={props.handleSaveMovie}
                        handleDeleteMovie={props.handleDeleteMovie} />
                    :
                    <NoResults
                        text={'Ничего не найдено'} />}
            </main>
            <Footer />
        </>
    );
}
export default Movies;