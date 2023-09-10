import likedIcon from '../../images/icon_liked_true.svg';
import unlikedIcon from '../../images/icon_liked_false.svg';

function MoviesCardList(props) {
    return (
        <li className="movie-card">
            <img src={props.thumbnail} className="movie-card__thumbnail" />
            <h3 className="movie-card__title">{props.name}</h3>
            <p className="movie-card__duration">{props.duration}</p>
            {props.isSaved && <button type="button" className={`movie-card__button movie-card__delete-button`}></button>}
            {!props.isSaved && <button type="button" className={`movie-card__button movie-card__like-button${props.isLiked? ' movie-card__like-button_liked' : ''}`}></button>}
        </li>
    );
}
export default MoviesCardList;