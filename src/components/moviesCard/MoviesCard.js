import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

function MoviesCardList(props) {
    const [isSavedMovie, setIsSavedMovie] = useState();
    const [savedCardId, setSavedCardId] = useState(null);
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
    useEffect(() => {
        if (props.savedMovies && !props.isSavedPage) {
            const savedCard = checkSavedMovie(props.savedMovies, props.card);
            if (savedCard) {
                setIsSavedMovie(true);
                setSavedCardId(savedCard._id);
            } else {
                setIsSavedMovie(false);
                setSavedCardId(null);
            }
        }
    }, [props.card, handleSave]);
    function checkSavedMovie(array, element) {
        return array.find(movie => movie.movieId === element.id) || false;
    };
    function getTiming(time) {
        if (+time < 60) {
            return `${time}м`;
        } else {
            return `${Math.floor(time / 60)}ч ${time % 60}м`;
        }
    };
    async function handleSave(e) {
        e.preventDefault();
        const options = {
            nameRU: props.card.nameRU,
            nameEN: props.card.nameEN,
            movieId: props.card.id,
            thumbnail: `https://api.nomoreparties.co${props.card.image.formats.thumbnail.url}`,
            trailerLink: props.card.trailerLink,
            image: `https://api.nomoreparties.co${props.card.image.url}`,
            description: props.card.description,
            year: props.card.year,
            duration: props.card.duration,
            director: props.card.director,
            country: props.card.country,
        }
        await props.handleSaveMovie(options, setIsSavedMovie, isSavedMovie, setIsButtonsDisabled);
    }
    async function handleDelete(e) {
        e.preventDefault();
        await props.handleDeleteMovie(props.card._id || savedCardId, setIsSavedMovie, isSavedMovie, setIsButtonsDisabled);
    }
    const thumbnailUrl = props.isSavedPage ? props.thumbnail : `https://api.nomoreparties.co` + props.thumbnail;
    return (
        <li>
            <NavLink to={props.card.trailerLink} target="_blank" rel="noreferrer" className="movie-card">
                <img src={thumbnailUrl} className="movie-card__thumbnail" alt={`Обложка фильма '${props.card.nameRU}'`} />
                <h2 className="movie-card__title">{props.card.nameRU}</h2>
                <p className="movie-card__duration">{getTiming(props.card.duration)}</p>
                {props.isSavedPage
                    &&
                    <button
                        disabled={isButtonsDisabled}
                        onClick={handleDelete}
                        type="button"
                        className={`movie-card__button movie-card__delete-button`}>
                    </button>}
                {!props.isSavedPage
                    &&
                    <button
                        disabled={isButtonsDisabled}
                        onClick={isSavedMovie ? handleDelete : handleSave}
                        type="button"
                        className={`movie-card__button movie-card__like-button${isSavedMovie ? ' movie-card__like-button_liked' : ''}`}>
                    </button>}
            </NavLink>
        </li>
    );
}
export default MoviesCardList;