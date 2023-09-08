import { useState, useEffect } from "react";
import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';

function App() {
    const [loggedIn, setLoggedIn] = useState(true);
    function toggleMenu() {
        const menuBody = document.getElementById('menu-body');
        if (menuBody.classList.contains('show')) {
            menuBody.classList.remove('show');
        } else {
            menuBody.classList.add('show');
        }
    }
    return (
        <>
            <Header loggedIn={loggedIn} handleToggleMenu={toggleMenu}/>
            <Main />
            <Footer />
        </>
    );
}

export default App;
