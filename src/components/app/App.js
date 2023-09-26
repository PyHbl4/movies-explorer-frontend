import { useState, useEffect } from "react";
import Main from '../main/Main';
import Movies from '../movies/Movies';
import SavedMovies from '../savedMovies/SavedMovies';
import Profile from '../profile/Profile';
import Register from '../register/Register';
import Login from '../login/Login';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NotFound from '../notFound/NotFound';
import InformationPopup from "../informationPopup/InformationPopup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRouteElement from "../protectedRoute/ProtectedRoute";
import { moviesApiClass } from '../../utils/api/MoviesApi';
import { mainApiClass } from "../../utils/api/MainApi";
import Preloader from '../preloader/Preloader';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [movies, setMovies] = useState([]);
    const [shortsOnly, setShortsOnly] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isInfoPopupOpened, setIsInfoPopupOpened] = useState(false);
    const [infoPopupTitle, setInfoPopupTitle] = useState('');
    const [infoPopupMessage, setInfoPopupMessage] = useState('');
    const [isLoaderActive, setIsLoaderActive] = useState(false);


    useEffect(() => {
        document.documentElement.setAttribute('lang', 'ru');
        checkToken();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            localStorage.shortsOnly === 'true' ? setShortsOnly(true) : setShortsOnly(false);
            localStorage.cards ? setMovies(JSON.parse(localStorage.cards)) : setMovies([]);
            getSavedMovies();
        }
    }, [loggedIn])

    function logOut() {
        localStorage.clear();
        checkToken();
    }

    function toggleMenu() {
        const menuBody = document.getElementById('menu-body');
        const menuOverlay = document.getElementById('menu-overlay');
        if (menuBody.classList.contains('show')) {
            menuBody.classList.remove('show');
            menuOverlay.classList.remove('show');
        } else {
            menuBody.classList.add('show');
            menuOverlay.classList.add('show');
        }
    }

    function checkToken() {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            mainApiClass.checkAuthorization(jwt)
                .then((result) => {
                    setCurrentUser(result.data);
                    setLoggedIn(true);
                })
                .catch((err) => {
                    console.log(err);
                    setCurrentUser(null);
                    setLoggedIn(false);
                })
        } else {
            setCurrentUser(null);
            setLoggedIn(false);
        }
    }

    function handleRegister(options) {
        mainApiClass.registerUserRequest(options)
            .then(() => {
                const loginOptions = {
                    email: options.email,
                    password: options.password
                }
                handleLogin(loginOptions);
            })
            .catch((err) => {
                setInfoPopupTitle('Ошибка авторизации');
                setInfoPopupMessage('Пожалуйста, проверьте введённые данные на корректность и попробуйте ещё раз');
                setIsInfoPopupOpened(true);
            })
    }
    function handleLogin(options) {
        mainApiClass.authorizeUserRequest(options)
            .then((data) => {
                localStorage.setItem('jwt', data.token);
                mainApiClass.checkAuthorization(data.token).then((result) => {
                    setCurrentUser(result.data);
                    setLoggedIn(true);
                })
            })
            .catch((err) => {
                setInfoPopupTitle('Ошибка авторизации');
                setInfoPopupMessage('Пожалуйста, проверьте введённые email и пароль на корректность и попробуйте ещё раз');
                setIsInfoPopupOpened(true);
            })
    }

    function getMovies(searchQuery, shorts = shortsOnly) {
        if (searchQuery !== '') {
            setIsLoaderActive(true);
            moviesApiClass.getFilteredMovies(searchQuery, shorts)
                .then((data) => {
                    localStorage.setItem('cards', JSON.stringify(data));
                    setMovies(data);
                })
                .catch((err) => {
                    setInfoPopupTitle('Ошибка при получении списка фильмов');
                    setInfoPopupMessage(err);
                    setIsInfoPopupOpened(true);
                })
                .finally(() => {
                    setIsLoaderActive(false);
                });
        }
    }

    function getSavedMovies() {
        mainApiClass.getMovies(localStorage.jwt)
            .then((data) => {
                setSavedMovies(data.data);
            })
            .catch((err) => {
                setInfoPopupTitle('Ошибка при получении списка сохранённых фильмов');
                setInfoPopupMessage(err);
                setIsInfoPopupOpened(true);
            })
    }

    function shortsToggler(searchQuery) {
        localStorage.setItem('shortsOnly', !shortsOnly);
        getMovies(searchQuery, !shortsOnly);
        localStorage.setItem('shortsOnly', !shortsOnly);
        setShortsOnly(!shortsOnly);
    }

    function handleSaveMovie(options) {
        mainApiClass.saveMovie(localStorage.jwt, options)
            .then(() => {
                getSavedMovies();
            })
            .catch((err) => {
                setInfoPopupTitle('Ошибка при сохранении фильма');
                setInfoPopupMessage(err);
                setIsInfoPopupOpened(true);
            })
    }

    function handleDeleteMovie(card, cardId) {
        mainApiClass.deleteMovie(localStorage.jwt, cardId)
            .then(() => {
                getSavedMovies();
            })
            .catch((err) => {
                setInfoPopupTitle('Ошибка при удалении фильма');
                setInfoPopupMessage(err);
                setIsInfoPopupOpened(true);
            })
    }

    function handleEditUser(jwt, options) {
        mainApiClass.editUser(jwt, options)
            .then((result) => {
                setCurrentUser(result.data);
            })
            .then(() => {
                setInfoPopupTitle('Готово!');
                setInfoPopupMessage('Данные пользователя успешно обновлены');
                setIsInfoPopupOpened(true);
            })
            .catch((err) => {
                setInfoPopupTitle('Ошибка обновления пользователя');
                setInfoPopupMessage(err);
                setIsInfoPopupOpened(true);
            })
    }

    function closeInfoPopup() {
        setIsInfoPopupOpened(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main
                        loggedIn={loggedIn}
                        handleToggleMenu={toggleMenu}
                        isFrontPage={true}
                    />} />
                    <Route path='/movies' element={<ProtectedRouteElement
                        element={Movies}
                        loggedIn={loggedIn}
                        handleToggleMenu={toggleMenu}
                        getMovies={getMovies}
                        getSavedMovies={getSavedMovies}
                        handleSaveMovie={handleSaveMovie}
                        handleDeleteMovie={handleDeleteMovie}
                        movies={movies}
                        savedMovies={savedMovies}
                        shortsOnly={shortsOnly}
                        shortsToggler={shortsToggler}
                        isLoaderActive={isLoaderActive}
                    />} />
                    <Route path='/saved-movies' element={<ProtectedRouteElement
                        element={SavedMovies}
                        loggedIn={loggedIn}
                        handleToggleMenu={toggleMenu}
                        getMovies={getMovies}
                        getSavedMovies={getSavedMovies}
                        movies={movies}
                        savedMovies={savedMovies}
                        shortsOnly={shortsOnly}
                        shortsToggler={shortsToggler}
                        handleDeleteMovie={handleDeleteMovie}

                    />} />
                    <Route path='/profile' element={<ProtectedRouteElement
                        element={Profile}
                        loggedIn={loggedIn}
                        handleToggleMenu={toggleMenu}
                        handleEditUser={handleEditUser}
                        logOut={logOut} />} />
                    <Route path='/signup' element={<Register
                        onRegister={handleRegister}
                        loggedIn={loggedIn}
                    />} />
                    <Route path='/signin' element={<Login
                        onLogin={handleLogin}
                        loggedIn={loggedIn}
                    />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <InformationPopup
                onClose={closeInfoPopup}
                isOpen={isInfoPopupOpened}
                popupTitle={infoPopupTitle}
                popupMessage={infoPopupMessage} />
            {isLoaderActive && <Preloader />}
        </CurrentUserContext.Provider>
    );
}

export default App;
