import { useState, useEffect } from "react";
import Main from '../main/Main';
import Movies from '../movies/Movies';
import SavedMovies from '../savedMovies/SavedMovies';
import Profile from '../profile/Profile';
import Register from '../register/Register';
import Login from '../login/Login';
import NotFound from '../notFound/NotFound';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    const [loggedIn, setLoggedIn] = useState(true);
    function logIn() {
        setLoggedIn(true);
    }
    function logOut() {
        setLoggedIn(false);
    }
    function toggleMenu() {
        const menuBody = document.getElementById('menu-body');
        if (menuBody.classList.contains('show')) {
            menuBody.classList.remove('show');
        } else {
            menuBody.classList.add('show');
        }
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main
                    loggedIn={loggedIn}
                    handleToggleMenu={toggleMenu}
                    logIn={logIn}
                />} />
                <Route path='/movies' element={<Movies
                    loggedIn={loggedIn}
                    handleToggleMenu={toggleMenu}
                    logIn={logIn}
                />} />
                <Route path='/saved-movies' element={<SavedMovies
                    loggedIn={loggedIn}
                    handleToggleMenu={toggleMenu}
                    logIn={logIn}
                />} />
                <Route path='/profile' element={<Profile
                    loggedIn={loggedIn}
                    handleToggleMenu={toggleMenu}
                    logIn={logIn}
                    logOut={logOut} />} />
                <Route path='/sign-up' element={<Register />} />
                <Route path='/sign-in' element={<Login />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
