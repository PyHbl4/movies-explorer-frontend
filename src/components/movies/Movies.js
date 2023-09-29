import { useEffect, useState } from "react";
import SearchForm from '../searchForm/SearchForm';
import Header from '../header/Header';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import NoResults from '../noResults/NoResults';
import Footer from '../footer/Footer';

function Movies(props) {
    const [shortsOnly, setShortsOnly] = useState(() => localStorage.shortsOnly === 'true' ? true : false);
    useEffect(() => {
        setShortsOnly(() => localStorage.shortsOnly === 'true' ? true : false);
    }, [])
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
                        shortsOnly={shortsOnly}
                        shortsSetter={setShortsOnly} />
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