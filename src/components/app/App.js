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
import { itemCounts } from "../../utils/constants/itemCounts";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [shortsOnly, setShortsOnly] = useState(false);
    const [savedShortsOnly, setSavedShortsOnly] = useState(false);
    const [isInfoPopupOpened, setIsInfoPopupOpened] = useState(false);
    const [infoPopupTitle, setInfoPopupTitle] = useState('');
    const [infoPopupMessage, setInfoPopupMessage] = useState('');
    const [isLoaderActive, setIsLoaderActive] = useState(false);
    const [mainSearchQuery, setMainSearchQuery] = useState(localStorage.mainSearchQuery || '');
    const [savedSearchQuery, setSavedSearchQuery] = useState(localStorage.savedSearchQuery || '');
    const [displayedCards, setDisplayedCards] = useState(getDisplayedCards());
    const [loadMoreCards, setLoadMoreCards] = useState(getLoadMoreCards());
    const [isNotFound, setIsNotFound] = useState(false);

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
            return itemCounts.displayedCards.desktop;
        } else if (screenWidth >= 768) {
            return itemCounts.displayedCards.tablet;
        } else {
            return itemCounts.displayedCards.mobile;
        }
    }

    function getLoadMoreCards() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1280) {
            return itemCounts.loadedCards.desktop;
        } else if (screenWidth >= 768) {
            return itemCounts.loadedCards.tablet;
        } else {
            return itemCounts.loadedCards.mobile;
        }
    }

    const handleLoadMore = () => {
        setDisplayedCards(displayedCards + loadMoreCards);
    };

    useEffect(() => {
        document.documentElement.setAttribute('lang', 'ru');
        checkToken();
    }, []);
    useEffect(() => {
        if (loggedIn) {
            getMovies();
            getSavedMovies();
        }
    }, [loggedIn]);
    function logOut() {
        localStorage.clear();
        checkToken();
    };
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
    };
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
    };
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
    };
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
    };
    function getMovies() {
        moviesApiClass.getMovies()
            .then((data) => {
                setMovies(data);
            })
            .catch((err) => {
                setInfoPopupTitle('Ошибка при получении списка фильмов');
                setInfoPopupMessage(err);
                setIsInfoPopupOpened(true);
            });
    }
    function getSavedMovies() {
        mainApiClass.getMovies(localStorage.jwt)
            .then((data) => {
                setSavedMovies(data.data);
                setFilteredSavedMovies(data.data);
            })
            .catch((err) => {
                setInfoPopupTitle('Ошибка при получении списка сохранённых фильмов');
                setInfoPopupMessage(err);
                setIsInfoPopupOpened(true);
            })
    }
    function filterMovies(searchQuery, moviesArray, shortsOnly, moviesSetter) {
        setIsLoaderActive(true);
        setDisplayedCards(getDisplayedCards());
        const filteredMovies = moviesArray.filter(movie => {
            const { nameRU, nameEN, duration } = movie;
            const searchText = searchQuery.toLowerCase().trim();
            return (
                (shortsOnly ? Number(duration) <= 40 : true) &&
                (nameRU.toLowerCase().includes(searchText) ||
                    nameEN.toLowerCase().includes(searchText))
            );
        });
        if (filteredMovies.length < 1) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }
        setIsLoaderActive(false);
        moviesSetter(filteredMovies);
    }

    function shortsToggler(searchQuery, moviesArray, filteredArray, moviesSetter, shortsOnly, shortsSetter) {
        if (filteredArray.length > 0) {
            filterMovies(searchQuery, moviesArray, !shortsOnly, moviesSetter)
        }
        shortsSetter(!shortsOnly);
    }

    function handleSaveMovie(options, savedSetter, isSaved, buttonsDisabler) {
        buttonsDisabler(true);
        mainApiClass.saveMovie(localStorage.jwt, options)
            .then(() => {
                getSavedMovies();
                savedSetter(!isSaved);
            })
            .catch((err) => {
                setInfoPopupTitle('Ошибка при сохранении фильма');
                setInfoPopupMessage(err);
                setIsInfoPopupOpened(true);
            })
            .finally(() => {
                buttonsDisabler(false);
            })
    }

    function handleDeleteMovie(cardId, savedSetter, isSaved, buttonsDisabler) {
        buttonsDisabler(true);
        mainApiClass.deleteMovie(localStorage.jwt, cardId)
            .then(() => {
                getSavedMovies();
                savedSetter(!isSaved);
            })
            .catch((err) => {
                setInfoPopupTitle('Ошибка при удалении фильма');
                setInfoPopupMessage(err);
                setIsInfoPopupOpened(true);
            })
            .finally(() => {
                buttonsDisabler(false);
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
                        getMovies={filterMovies}
                        handleSaveMovie={handleSaveMovie}
                        handleDeleteMovie={handleDeleteMovie}
                        movies={movies}
                        filteredMovies={filteredMovies}
                        savedMovies={savedMovies}
                        shortsOnly={shortsOnly}
                        shortsToggler={shortsToggler}
                        moviesSetter={setFilteredMovies}
                        searchQuery={mainSearchQuery}
                        setSearchQuery={setMainSearchQuery}
                        shortsSetter={setShortsOnly}
                        displayedCards={displayedCards}
                        handleLoadMore={handleLoadMore}
                        isNotFound={isNotFound}
                    />} />
                    <Route path='/saved-movies' element={<ProtectedRouteElement
                        element={SavedMovies}
                        loggedIn={loggedIn}
                        handleToggleMenu={toggleMenu}
                        getMovies={filterMovies}
                        movies={movies}
                        filteredMovies={filteredSavedMovies}
                        savedMovies={savedMovies}
                        shortsOnly={savedShortsOnly}
                        shortsToggler={shortsToggler}
                        handleDeleteMovie={handleDeleteMovie}
                        moviesSetter={setFilteredSavedMovies}
                        searchQuery={savedSearchQuery}
                        isNotFound={isNotFound}
                        setSearchQuery={setSavedSearchQuery}
                        shortsSetter={setSavedShortsOnly}
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
