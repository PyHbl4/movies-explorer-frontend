import MoviesCard from '../moviesCard/MoviesCard';

function MoviesCardList(props) {
    return (
        <div className='app-section'>
            <ul className="movies-cards">
                {props.cards.map((card, index) => (
                    <MoviesCard key={index} name={card.name} thumbnail={card.thumbnail} duration={card.duration} isLiked={card.isLiked} isSaved={card.isSavedCard} />
                ))}
            </ul>
            <button className='add-more' type="button">Ещё</button>
        </div>
    );
}

export default MoviesCardList;