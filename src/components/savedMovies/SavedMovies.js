import SearchForm from '../searchForm/SearchForm';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import NoResults from '../noResults/NoResults';

function SavedMovies(props) {
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
                        shortsOnly={props.shortsOnly} />
                </section>
                {props.savedMovies.length > 0 ? <MoviesCardList
                    isSavedPage={true}
                    cards={props.savedMovies}
                    handleDeleteMovie={props.handleDeleteMovie} />
                    :
                    <NoResults text={'Сохранённых фильмов нет'} />}
            </main>
            <Footer />
        </>
    );
}
export default SavedMovies;