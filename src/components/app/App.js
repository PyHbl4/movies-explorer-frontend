import { useState, useEffect } from "react";
import Main from '../main/Main';
import Movies from '../movies/Movies';
import SavedMovies from '../savedMovies/SavedMovies';
import Profile from '../profile/Profile';
import Register from '../register/Register';
import Login from '../login/Login';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NotFound from '../notFound/NotFound';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRouteElement from "../protectedRoute/ProtectedRoute";
import { mainApiClass } from "../../utils/api/MainApi";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        document.documentElement.setAttribute('lang', 'ru');
        checkToken();
    }, []);

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
                handleLogin(options);
            })
            .catch((err) => {
                console.log(err);
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
                console.log(err);
            })
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
                    />} />
                    <Route path='/saved-movies' element={<ProtectedRouteElement
                        element={SavedMovies}
                        loggedIn={loggedIn}
                        handleToggleMenu={toggleMenu}
                    />} />
                    <Route path='/profile' element={<ProtectedRouteElement
                        element={Profile}
                        loggedIn={loggedIn}
                        handleToggleMenu={toggleMenu}
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
        </CurrentUserContext.Provider>
    );
}

export default App;
