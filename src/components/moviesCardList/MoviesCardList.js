import MoviesCard from '../moviesCard/MoviesCard';

function MoviesCardList(props) {
    const showedCards = props.displayedCards ? props.cards.slice(0, props.displayedCards) : props.cards;
    return (
        <div className='app-section'>
            <section className='movies'>
                <ul className="movies-cards">
                    {showedCards.map((card) => (
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
            {props.displayedCards < props.cards.length && <button onClick={props.handleLoadMore} className='add-more' type="button">Ещё</button>}
        </div>
    );
}

export default MoviesCardList;