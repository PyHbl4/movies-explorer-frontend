import React, { useState, useEffect } from 'react';
import MoviesCard from '../moviesCard/MoviesCard';

function MoviesCardList(props) {
    const [displayedCards, setDisplayedCards] = useState(getDisplayedCards());
    const [loadMoreCards, setLoadMoreCards] = useState(getLoadMoreCards());

    useEffect(() => {
        function handleResize() {
            setDisplayedCards(getDisplayedCards());
            setLoadMoreCards(getLoadMoreCards());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function getDisplayedCards() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1280) {
            return 12;
        } else if (screenWidth >= 768) {
            return 8;
        } else {
            return 5;
        }
    }

    function getLoadMoreCards() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1280) {
            return 3;
        } else if (screenWidth >= 768) {
            return 2;
        } else {
            return 2;
        }
    }

    const handleLoadMore = () => {
        setDisplayedCards(displayedCards + loadMoreCards);
    };

    return (
        <div className='app-section'>
            <section className='movies'>
                <ul className="movies-cards">
                    {props.cards.slice(0, displayedCards).map((card, index) => (
                        <MoviesCard
                            key={card.id || card._id}
                            card={card}
                            thumbnail={card.image.url || card.image}
                            isLiked={card.isLiked}
                            savedMovies={props.savedMovies}
                            isSavedPage={props.isSavedPage}
                            handleSaveMovie={props.handleSaveMovie}
                            handleDeleteMovie={props.handleDeleteMovie} />
                    ))}
                </ul>
            </section>
            {displayedCards < props.cards.length && <button onClick={handleLoadMore} className='add-more' type="button">Ещё</button>}
        </div>
    );
}

export default MoviesCardList;