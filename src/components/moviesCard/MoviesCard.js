function MoviesCardList(props) {
    function getTiming(time) {
        if (+time < 60) {
            return `${time}м`;
        } else {
            return `${Math.floor(time / 60)}ч ${time%60}м`;
        }
    }
    return (
        <li className="movie-card">
            <img src={`https://api.nomoreparties.co` + props.thumbnail} className="movie-card__thumbnail" alt={`Обложка фильма '${props.name}'`} />
            <h2 className="movie-card__title">{props.name}</h2>
            <p className="movie-card__duration">{getTiming(props.duration)}</p>
            {props.isSaved && <button type="button" className={`movie-card__button movie-card__delete-button`}></button>}
            {!props.isSaved && <button type="button" className={`movie-card__button movie-card__like-button${props.isLiked? ' movie-card__like-button_liked' : ''}`}></button>}
        </li>
    );
}
export default MoviesCardList;