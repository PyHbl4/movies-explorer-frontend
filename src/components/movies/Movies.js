import SearchForm from '../searchForm/SearchForm';
import { useState, useEffect } from "react";
import Header from '../header/Header';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import Footer from '../footer/Footer';
import { moviesApiClass } from '../../utils/api/MoviesApi';

function Movies(props) {
    const [cards, setCards] = useState([]);
    const [shortsOnly, setShortsOnly] = useState(false);

    useEffect(() => {

    }, []);
    function shortsToggler() {
        setShortsOnly(!shortsOnly);
    }
    function filterMovies(movies, searchQuery) {
        const filteredMovies = movies.filter(movie => {
            const { nameRU, nameEN, director, description, duration } = movie;
            const searchText = searchQuery.toLowerCase();

            return (
                (shortsOnly ? +duration <= 40 : true) &&
                (nameRU.toLowerCase().includes(searchText) ||
                    nameEN.toLowerCase().includes(searchText) ||
                    director.toLowerCase().includes(searchText) ||
                    description.toLowerCase().includes(searchText))
            );
        });

        return filteredMovies;
    }

    function getCards(searchQuery = ' ') {
        moviesApiClass.getMovies()
            .then((data) => {
                const result = filterMovies(data, searchQuery);
                setCards(result);
            });
    }
    return (
        <>
            <Header loggedIn={props.loggedIn} handleToggleMenu={props.handleToggleMenu} logIn={props.logIn} />
            <main className="main movies-page">
                <section className='app-section search-section'>
                    <SearchForm cards={cards} getCards={getCards} handleCheckbox={shortsToggler} />
                </section>
                <MoviesCardList cards={cards} />
            </main>
            <Footer />
        </>
    );
}
export default Movies;