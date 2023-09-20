function MoviesCardList(props) {
    return (
        <li className="movie-card">
            <img src={props.thumbnail} className="movie-card__thumbnail" alt={`Обложка фильма '${props.name}'`} />
            <h2 className="movie-card__title">{props.name}</h2>
            <p className="movie-card__duration">{props.duration}</p>
            {props.isSaved && <button type="button" className={`movie-card__button movie-card__delete-button`}></button>}
            {!props.isSaved && <button type="button" className={`movie-card__button movie-card__like-button${props.isLiked? ' movie-card__like-button_liked' : ''}`}></button>}
        </li>
    );
}
export default MoviesCardList;