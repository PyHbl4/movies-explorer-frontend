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
                        moviesSetter={props.moviesSetter}
                        searchQuery={props.searchQuery}
                        filteredMovies={props.filteredMovies}
                        setSearchQuery={props.setSearchQuery}
                        shortsOnly={props.shortsOnly}
                        shortsSetter={props.shortsSetter} />
                </section>
                <MoviesCardList
                    cards={props.filteredMovies}
                    savedMovies={props.savedMovies}
                    isSavedPage={false}
                    handleSaveMovie={props.handleSaveMovie}
                    displayedCards={props.displayedCards}
                    handleLoadMore={props.handleLoadMore}
                    handleDeleteMovie={props.handleDeleteMovie} />
                {props.isNotFound && <NoResults text={'Ничего не найдено'} />}
            </main>
            <Footer />
        </>
    );
}
export default Movies;