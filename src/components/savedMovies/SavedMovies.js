import { useState, useEffect } from "react";
import SearchForm from '../searchForm/SearchForm';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import NoResults from '../noResults/NoResults';

function SavedMovies(props) {
    const [savedShortsOnly, setSavedShortsOnly] = useState(false);
    const [savedSearchQuery, setSavedSearchQuery] = useState('');
    
    useEffect(() => {
        props.setFilteredMovies(props.savedMovies);
    }, [props.savedMovies])

    return (
        <>
            <Header
                loggedIn={props.loggedIn}
                handleToggleMenu={props.handleToggleMenu}
                logIn={props.logIn} />
            <main className="main movies-page">
                <section className='app-section search-section'>
                    <SearchForm
                        cards={props.savedMovies}
                        getCards={props.getMovies}
                        handleCheckbox={props.shortsToggler}
                        moviesSetter={props.moviesSetter}
                        searchQuery={savedSearchQuery}
                        setSearchQuery={setSavedSearchQuery}
                        filteredMovies={props.filteredMovies}
                        shortsOnly={savedShortsOnly}
                        isSavedPage={true}
                        shortsSetter={setSavedShortsOnly} />
                </section>
                {props.filteredMovies.length > 0
                    ?
                    <MoviesCardList
                        isSavedPage={true}
                        cards={props.filteredMovies}
                        handleDeleteMovie={props.handleDeleteMovie} />
                    :
                    props.isNotFound
                    ?
                    <NoResults text={'Ничего не найдено'} />
                    :
                    <NoResults text={'Сохранённых фильмов нет'} />}
            </main>
            <Footer />
        </>
    );
}
export default SavedMovies;